//// [restElementMustBeLast.ts]
var [...a, x] = [1, 2, 3];  // Error, rest must be last element
[...a, x] = [1, 2, 3];      // Error, rest must be last element


//// [restElementMustBeLast.js]
var _a = [1, 2, 3], x = _a[1]; // Error, rest must be last element
_b = [1, 2, 3], x = _b[1]; // Error, rest must be last element
var _b;
