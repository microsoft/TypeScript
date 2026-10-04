//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements6.ts] ////

//// [functionWithDefaultParameterWithNoStatements6.ts]
function foo(a = true) { }

function bar(a = true) {
}

//// [functionWithDefaultParameterWithNoStatements6.js]
"use strict";
function foo(a = true) { }
function bar(a = true) {
}
