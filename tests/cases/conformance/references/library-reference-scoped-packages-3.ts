// @noImplicitReferences: true
// @traceResolution: true
// @currentDirectory /foo
// @typeRoots: /types

// @filename: /types/beep__boop/index.d.ts
export const y = 0;

// @filename: /foo/a.ts
/// <reference types="@beep/boop" />
