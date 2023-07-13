//// [tests/cases/compiler/varAndFunctionShareName.ts] ////

//// [varAndFunctionShareName.ts]
var myFn;
function myFn(): any { }

//// [varAndFunctionShareName.js]
var myFn;
function myFn() { }
