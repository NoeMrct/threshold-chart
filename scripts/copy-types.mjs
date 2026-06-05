// Copy the hand-written type declarations into the build output.
// Kept as a tiny Node script so the build stays cross-platform (no `cp`).
import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
copyFileSync('src/index.d.ts', 'dist/index.d.ts');
console.log('Copied src/index.d.ts -> dist/index.d.ts');
