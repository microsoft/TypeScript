//// [tests/cases/compiler/indexWithoutParamType.ts] ////

//// [indexWithoutParamType.ts]
var y: { []; } // Error

//// [indexWithoutParamType.js]
"use strict";
var y; // Error
