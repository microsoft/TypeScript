//// [tests/cases/compiler/functionOverloadImplementationOfWrongName2.ts] ////

//// [functionOverloadImplementationOfWrongName2.ts]
function foo(x);
function bar() { }
function foo(x, y);

//// [functionOverloadImplementationOfWrongName2.js]
"use strict";
function bar() { }
