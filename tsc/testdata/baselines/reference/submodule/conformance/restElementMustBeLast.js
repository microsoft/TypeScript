//// [tests/cases/conformance/types/rest/restElementMustBeLast.ts] ////

//// [restElementMustBeLast.ts]
var [...a, x] = [1, 2, 3];  // Error, rest must be last element
[...a, x] = [1, 2, 3];      // Error, rest must be last element


//// [restElementMustBeLast.js]
var [...a, x] = [1, 2, 3];
[...a, x] = [1, 2, 3];
