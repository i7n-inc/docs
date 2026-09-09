import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';

const manifestUrl = 'https://github.com/i7n-inc/atx-releases/releases/latest/download/version.json';
const output = resolve('src/generated/manifest.json');

try {
  const response = await fetch(manifestUrl);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const manifest = await response.json();
  if (!manifest.version || !manifest.checksums) throw new Error('Invalid manifest payload');
  await mkdir(dirname(output), {recursive: true});
  await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Fetched release manifest for ${manifest.version}.`);
} catch (error) {
  try {
    await readFile(output, 'utf8');
    console.warn(`Could not refresh release manifest; using committed snapshot: ${error.message}`);
  } catch {
    console.error(`Could not fetch release manifest and no snapshot exists: ${error.message}`);
    process.exitCode = 1;
  }
}
