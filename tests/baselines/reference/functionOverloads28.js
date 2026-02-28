//// [tests/cases/compiler/functionOverloads28.ts] ////

//// [functionOverloads28.ts]
function foo():string;
function foo(bar:string):number;
function foo(bar?:any):any{ return '' }
var t:any; var x = foo(t);


//// [functionOverloads28.js]
"use strict";
function foo(bar) { return ''; }
var t;
var x = foo(t);
