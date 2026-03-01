//// [tests/cases/compiler/functionCall4.ts] ////

//// [functionCall4.ts]
function foo():any{return ""}; 
function bar():()=>any{return foo}; 
var x = bar();

//// [functionCall4.js]
"use strict";
function foo() { return ""; }
;
function bar() { return foo; }
;
var x = bar();
