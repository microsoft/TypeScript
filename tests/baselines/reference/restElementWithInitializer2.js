//// [restElementWithInitializer2.ts]
var a: number[];
var x: number[];
[...x = a] = a;  // Error, rest element cannot have initializer


//// [restElementWithInitializer2.js]
var _a;
var a;
var x;
_a = a.slice(0), x = _a === void 0 ? a : _a; // Error, rest element cannot have initializer
