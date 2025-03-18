//// [tests/cases/conformance/es6/destructuring/restElementWithInitializer2.ts] ////

//// [restElementWithInitializer2.ts]
var a: number[];
var x: number[];
[...x = a] = a;  // Error, rest element cannot have initializer


//// [restElementWithInitializer2.js]
var a;
var x;
[...x = a] = a;
