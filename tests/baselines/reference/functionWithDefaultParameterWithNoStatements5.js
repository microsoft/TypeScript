//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements5.ts] ////

//// [functionWithDefaultParameterWithNoStatements5.ts]
function foo(a = 0) { }

function bar(a = 0) {
}

//// [functionWithDefaultParameterWithNoStatements5.js]
"use strict";
function foo(a = 0) { }
function bar(a = 0) {
}
