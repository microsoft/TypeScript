//// [tests/cases/compiler/functionOverloads17.ts] ////

//// [functionOverloads17.ts]
function foo():{a:number;}
function foo():{a:string;} { return {a:""} }


//// [functionOverloads17.js]
"use strict";
function foo() { return { a: "" }; }
