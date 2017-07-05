// @noImplicitReferences: true
// @traceResolution: true
// @typeRoots: /test/types
// @currentDirectory: /test

// Don't crash in circular library reference situations

// @filename: /test/types/alpha/index.d.ts
/// <reference types="beta" />
declare var alpha: { a: string };

// @filename: /test/types/beta/index.d.ts
/// <reference types="alpha" />
declare var beta: { b: string };

// @filename: /test/foo.ts
/// <reference types="alpha" />
/// <reference types="beta" />
var x: string = alpha.a + beta.b;

