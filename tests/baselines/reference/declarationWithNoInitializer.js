//// [declarationWithNoInitializer.ts]
var [a, b];          // Error, no initializer
var {c, d};          // Error, no initializer


//// [declarationWithNoInitializer.js]
var _a = void 0, a = _a[0], b = _a[1]; // Error, no initializer
var _b = void 0, c = _b.c, d = _b.d; // Error, no initializer
