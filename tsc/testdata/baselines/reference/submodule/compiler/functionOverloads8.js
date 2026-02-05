//// [tests/cases/compiler/functionOverloads8.ts] ////

//// [functionOverloads8.ts]
function foo();
function foo(foo:string);
function foo(foo?:any){ return '' }


//// [functionOverloads8.js]
"use strict";
function foo(foo) { return ''; }
