// @noImplicitReferences: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// The relative name "../pkg/" ends with a separator, so it names a directory.
// The primary lookup resolves the name from the type root "/types", not from
// "/app/src", so the candidate is "/pkg/". The lookup skips the file lookup, so
// it does not use "/pkg.d.ts" or "/pkg/.d.ts". It uses "/pkg/index.d.ts", so
// "fromFile" is an error.

// @filename: /types/README.md
The type root.

// @filename: /pkg.d.ts
declare const fromFile: number;

// @filename: /pkg/.d.ts
declare const fromFile: number;

// @filename: /pkg/index.d.ts
declare const fromDirectory: number;

// @filename: /app/src/a.ts
/// <reference types="../pkg/" />
fromDirectory;
fromFile;
