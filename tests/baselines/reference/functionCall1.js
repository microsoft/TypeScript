//// [tests/cases/compiler/functionCall1.ts] ////

//// [functionCall1.ts]
function foo():any{return ""};
var x = foo();

//// [functionCall1.js]
"use strict";
function foo() { return ""; }
;
var x = foo();
