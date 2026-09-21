import {readdir, readFile} from 'node:fs/promises';
import {resolve, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = process.cwd();
// Release notes are an immutable historical record, not current product guidance.
const immutableHistoryPaths = new Set(['docs/changelog.md']);
const genericMemoryUses = /\b(?:in-memory|process memory|memory allocation|memory usage|memory leak|memory-safe)\b/gi;
const retiredPatterns = [
  /\bmemor(?:y|ies)\b/gi,
  /\bmemory[- ]system\b/gi,
  /\bknowledge[ _-]?nodes?\b/gi,
  /\bremember_this\b/gi,
];

function removeGenericComputingUses(text) {
  return text.replace(genericMemoryUses, (match) => ' '.repeat(match.length));
}

export function findRetiredTerms(text) {
  const searchable = removeGenericComputingUses(text);
  return retiredPatterns.flatMap((pattern) => [...searchable.matchAll(pattern)].map((match) => match[0]));
}

async function filesIn(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const files = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  }));
  return files.flat();
}

async function activeDocumentationFiles() {
  // Docusaurus publishes documents from docs/, page/content sources from src/,
  // and these root configuration and navigation files.
  const directories = ['docs', 'src'];
  const files = (await Promise.all(directories.map((directory) => filesIn(resolve(root, directory))))).flat();
  const topLevel = ['README.md', 'docusaurus.config.ts', 'sidebars.ts'];
  return [...files, ...topLevel.map((file) => resolve(root, file))]
    .filter((path) => !immutableHistoryPaths.has(relative(root, path)));
}

async function main() {
  const violations = [];
  for (const path of await activeDocumentationFiles()) {
    const name = relative(root, path);
    const terms = [...findRetiredTerms(name), ...findRetiredTerms(await readFile(path, 'utf8'))];
    if (terms.length > 0) violations.push(`${name}: ${terms.join(', ')}`);
  }

  // Screenshot filenames are public asset references even though their binary data is not text.
  for (const path of await filesIn(resolve(root, 'static'))) {
    const name = relative(root, path);
    const terms = findRetiredTerms(name);
    if (terms.length > 0) violations.push(`${name}: ${terms.join(', ')}`);
  }

  if (violations.length > 0) {
    console.error('Retired domain vocabulary found in active documentation:');
    for (const violation of violations) console.error(`- ${violation}`);
    process.exitCode = 1;
    return;
  }
  console.log('Active documentation uses canonical Learnings and Knowledge Graph vocabulary.');
}

const isMain = resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url);
if (isMain) await main();
