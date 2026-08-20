//// [tests/cases/compiler/functionOverloads15.ts] ////

//// [functionOverloads15.ts]
function foo(foo:{a:string; b:number;}):string;
function foo(foo:{a:string; b:number;}):number;
function foo(foo:{a:string; b?:number;}):any { return "" }


//// [functionOverloads15.js]
"use strict";
function foo(foo) { return ""; }
