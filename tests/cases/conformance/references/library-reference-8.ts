// @noImplicitReferences: true
// @traceResolution: true

// Don't crash in circular library reference situations

// @filename: /types/alpha/index.d.ts
/// <reference types="beta" />
declare var alpha: { a: string };

// @filename: /types/beta/index.d.ts
/// <reference types="alpha" />
declare var beta: { b: string };

// @filename: /foo.ts
/// <reference types="alpha" />
/// <reference types="beta" />
var x: string = alpha.a + beta.b;

