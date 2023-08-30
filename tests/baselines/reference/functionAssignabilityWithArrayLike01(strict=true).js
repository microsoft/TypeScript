//// [tests/cases/compiler/functionAssignabilityWithArrayLike01.ts] ////

//// [functionAssignabilityWithArrayLike01.ts]
function func() {}
const array: ArrayLike<any> = func;

//// [functionAssignabilityWithArrayLike01.js]
"use strict";
function func() { }
var array = func;
