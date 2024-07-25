//// [tests/cases/compiler/indexWithoutParamType.ts] ////

//// [indexWithoutParamType.ts]
var y: { []; } // Error

//// [indexWithoutParamType.js]
var y; // Error
