//// [tests/cases/conformance/es6/destructuring/restElementWithInitializer1.ts] ////

//// [restElementWithInitializer1.ts]
var a: number[];
var [...x = a] = a;  // Error, rest element cannot have initializer


//// [restElementWithInitializer1.js]
var a;
var _a = a.slice(0), x = _a === void 0 ? a : _a; // Error, rest element cannot have initializer
