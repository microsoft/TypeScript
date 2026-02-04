//// [tests/cases/compiler/functionCall15.ts] ////

//// [functionCall15.ts]
function foo(a?:string, b?:number, ...b:number[]){}

//// [functionCall15.js]
"use strict";
function foo(a, b, ...b) { }
