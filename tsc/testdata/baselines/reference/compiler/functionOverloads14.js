//// [tests/cases/compiler/functionOverloads14.ts] ////

//// [functionOverloads14.ts]
function foo():{a:number;}
function foo():{a:string;}
function foo():{a:any;} { return {a:1} }


//// [functionOverloads14.js]
"use strict";
function foo() { return { a: 1 }; }
