//// [tests/cases/conformance/references/library-reference-6.ts] ////

//// [index.d.ts]
declare var alpha: { a: string };

//// [foo.ts]
/// <reference types="alpha" />
var x: string = alpha.a;


//// [foo.js]
/// <reference types="alpha" />
var x = alpha.a;
