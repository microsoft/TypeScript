//// [tests/cases/conformance/references/library-reference-8.ts] ////

//// [index.d.ts]

// Don't crash in circular library reference situations

/// <reference library="beta" />
declare var alpha: { a: string };

//// [index.d.ts]
/// <reference library="alpha" />
declare var beta: { b: string };

//// [foo.ts]
/// <reference library="alpha" />
/// <reference library="beta" />
var x: string = alpha.a + beta.b;



//// [foo.js]
/// <reference library="alpha" />
/// <reference library="beta" />
var x = alpha.a + beta.b;
