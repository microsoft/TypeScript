// @noImplicitReferences: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// The relative name "../pkg/" ends with a separator, so it names a directory.
// The primary lookup in the type root "/types" skips the file lookup and uses
// "/pkg/index.d.ts", not "/pkg/.d.ts". So "fromFile" is an error.

// @filename: /types/README.md
The type root.

// @filename: /pkg/.d.ts
declare const fromFile: number;

// @filename: /pkg/index.d.ts
declare const fromDirectory: number;

// @filename: /a.ts
/// <reference types="../pkg/" />
fromDirectory;
fromFile;
