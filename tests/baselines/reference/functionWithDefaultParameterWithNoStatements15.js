//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements15.ts] ////

//// [functionWithDefaultParameterWithNoStatements15.ts]
var v: any[];

function foo(a = (1 + 1)) { }

function bar(a = (1 + 1)) {
}

//// [functionWithDefaultParameterWithNoStatements15.js]
"use strict";
var v;
function foo(a = (1 + 1)) { }
function bar(a = (1 + 1)) {
}
