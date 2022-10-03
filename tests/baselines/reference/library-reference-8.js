//// [tests/cases/conformance/references/library-reference-8.ts] ////

//// [index.d.ts]
// Don't crash in circular library reference situations

/// <reference types="beta" />
declare var alpha: { a: string };

//// [index.d.ts]
/// <reference types="alpha" />
declare var beta: { b: string };

//// [foo.ts]
/// <reference types="alpha" />
/// <reference types="beta" />
var x: string = alpha.a + beta.b;



//// [foo.js]
/// <reference types="alpha" />
/// <reference types="beta" />
var x = alpha.a + beta.b;
