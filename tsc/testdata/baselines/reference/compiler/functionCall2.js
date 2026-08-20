//// [tests/cases/compiler/functionCall2.ts] ////

//// [functionCall2.ts]
function foo():number{return 1}; 
var x = foo();

//// [functionCall2.js]
"use strict";
function foo() { return 1; }
;
var x = foo();
