//// [tests/cases/conformance/es6/destructuring/restElementWithInitializer2.ts] ////

//// [restElementWithInitializer2.ts]
declare var a: number[];
var x: number[];
[...x = a] = a;  // Error, rest element cannot have initializer


//// [restElementWithInitializer2.js]
"use strict";
var x;
[...x = a] = a; // Error, rest element cannot have initializer
