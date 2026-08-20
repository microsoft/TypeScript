//// [tests/cases/compiler/functionOverloads1.ts] ////

//// [functionOverloads1.ts]
function foo();
1+1;
function foo():string { return "a" }

//// [functionOverloads1.js]
"use strict";
1 + 1;
function foo() { return "a"; }
