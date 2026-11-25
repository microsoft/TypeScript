// @noImplicitReferences: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// The name "C:" is only a drive root. The resolver adds the root separator,
// so the candidate is "C:/". No file is under "C:/", so the name is an error.

// @filename: /types/README.md
The type root.

// @filename: /a.ts
/// <reference types="C:" />
export {};
