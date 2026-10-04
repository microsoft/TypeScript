//// [tests/cases/compiler/voidArrayLit.ts] ////

//// [voidArrayLit.ts]
var va = [(() => {})()]; // ok
(() => {})(); // ok
function foo(s:string) {}
foo((()=>{})()); // error


//// [voidArrayLit.js]
"use strict";
var va = [(() => { })()]; // ok
(() => { })(); // ok
function foo(s) { }
foo((() => { })()); // error
