//// [tests/cases/compiler/varInFunctionInVarInitializer.ts] ////

//// [varInFunctionInVarInitializer.ts]
var a = function () {
    var c = 1;
    return c;
},
    b = 1;

//// [varInFunctionInVarInitializer.js]
"use strict";
var a = function () {
    var c = 1;
    return c;
}, b = 1;
