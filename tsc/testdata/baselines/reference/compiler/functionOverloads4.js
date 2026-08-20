//// [tests/cases/compiler/functionOverloads4.ts] ////

//// [functionOverloads4.ts]
function foo():number;
function foo():string { return "a" }

//// [functionOverloads4.js]
"use strict";
function foo() { return "a"; }
