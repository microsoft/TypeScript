// @noImplicitReferences: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// tsc treats the name "C:" as the drive root "C:/", so the candidate is "C:/".
// No file is under "C:/", so the name is an error.

// @filename: /types/README.md
The type root.

// @filename: /a.ts
/// <reference types="C:" />
export {};
