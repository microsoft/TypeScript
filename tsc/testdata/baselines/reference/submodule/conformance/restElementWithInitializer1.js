//// [tests/cases/conformance/es6/destructuring/restElementWithInitializer1.ts] ////

//// [restElementWithInitializer1.ts]
var a: number[];
var [...x = a] = a;  // Error, rest element cannot have initializer


//// [restElementWithInitializer1.js]
var a;
var [...x = a] = a;
