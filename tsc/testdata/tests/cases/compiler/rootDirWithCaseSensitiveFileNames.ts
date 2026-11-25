// @useCaseSensitiveFileNames: true
// @rootDir: /proj/src
// @outDir: /proj/out

// The file system is case sensitive, so "/proj/SRC" and "/proj/src" are
// different directories. "/proj/SRC/b.ts" is not under "rootDir", and the
// compiler reports an error for it.

// @filename: /proj/src/a.ts
export const a = 1;

// @filename: /proj/SRC/b.ts
export const b = 2;
