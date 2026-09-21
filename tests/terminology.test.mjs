import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import test from 'node:test';
import {findRetiredTerms} from '../scripts/check-terminology.mjs';

test('terminology guard accepts generic computing uses', () => {
  assert.deepEqual(
    findRetiredTerms('An in-memory database reports process memory and memory allocation.'),
    [],
  );
});

test('terminology guard rejects retired domain vocabulary', () => {
  const findings = findRetiredTerms('ATX Memories and Knowledge Nodes use remember_this.');
  assert.deepEqual(findings.sort(), ['Knowledge Nodes', 'Memories', 'remember_this'].sort());
});

test('active documentation passes the terminology guard', () => {
  execFileSync(process.execPath, ['scripts/check-terminology.mjs'], {
    cwd: new URL('..', import.meta.url),
    stdio: 'pipe',
  });
});
