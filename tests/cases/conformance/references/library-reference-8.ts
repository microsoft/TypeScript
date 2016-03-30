// @noImplicitReferences: true

// Don't crash in circular library reference situations

// @filename: typings/alpha/index.d.ts
/// <reference library="beta" />
declare var alpha: { a: string };

// @filename: typings/beta/index.d.ts
/// <reference library="alpha" />
declare var beta: { b: string };

// @filename: foo.ts
/// <reference library="alpha" />
/// <reference library="beta" />
var x: string = alpha.a + beta.b;

