//// [tests/cases/conformance/references/library-reference-9.ts] ////

//// [index.d.ts]

// Use types search path

declare var alpha: { a: string };

//// [foo.ts]
/// <reference types="alpha" />
var x: string = alpha.a;


//// [foo.js]
/// <reference types="alpha" />
var x = alpha.a;
