//// [tests/cases/conformance/types/rest/restElementMustBeLast.ts] ////

//// [restElementMustBeLast.ts]
var [...a, x] = [1, 2, 3];  // Error, rest must be last element
[...a, x] = [1, 2, 3];      // Error, rest must be last element


//// [restElementMustBeLast.js]
var _a;
var _b = [1, 2, 3], x = _b[1]; // Error, rest must be last element
_a = [1, 2, 3], x = _a[1]; // Error, rest must be last element
