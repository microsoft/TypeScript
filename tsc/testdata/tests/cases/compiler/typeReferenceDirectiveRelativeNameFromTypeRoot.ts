// @noImplicitReferences: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// The primary lookup of the relative name "../pkg" starts in the type root
// "/types". The trace shows normalized candidates, such as "/pkg.d.ts", not
// "/types/../pkg.d.ts".

// @filename: /types/README.md
The type root.

// @filename: /pkg/package.json
{ "name": "pkg", "version": "1.0.0", "types": "index.d.ts" }

// @filename: /pkg/index.d.ts
declare const pkg: number;

// @filename: /a.ts
/// <reference types="../pkg" />
export const a: number = pkg;
