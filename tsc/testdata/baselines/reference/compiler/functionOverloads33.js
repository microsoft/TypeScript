//// [tests/cases/compiler/functionOverloads33.ts] ////

//// [functionOverloads33.ts]
function foo(bar:string):string;
function foo(bar:any):number;
function foo(bar:any):any{ return bar }
var x = foo(5);


//// [functionOverloads33.js]
"use strict";
function foo(bar) { return bar; }
var x = foo(5);
