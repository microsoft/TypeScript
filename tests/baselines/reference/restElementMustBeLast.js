//// [restElementMustBeLast.ts]
var [...a, x] = [1, 2, 3];  // Error, rest must be last element
[...a, x] = [1, 2, 3];      // Error, rest must be last element


//// [restElementMustBeLast.js]
var _a = [1, 2, 3], x = _a[1]; // Error, rest must be last element
_a_1 = [1, 2, 3], x = _a_1[1]; // Error, rest must be last element
var _a_1;
