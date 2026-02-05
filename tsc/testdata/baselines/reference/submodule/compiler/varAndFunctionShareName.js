//// [tests/cases/compiler/varAndFunctionShareName.ts] ////

//// [varAndFunctionShareName.ts]
var myFn;
function myFn(): any { }

//// [varAndFunctionShareName.js]
"use strict";
var myFn;
function myFn() { }
