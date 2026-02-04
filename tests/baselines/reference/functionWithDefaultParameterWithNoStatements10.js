//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements10.ts] ////

//// [functionWithDefaultParameterWithNoStatements10.ts]
function foo(a = [0]) { }

function bar(a = [0]) {
}

//// [functionWithDefaultParameterWithNoStatements10.js]
"use strict";
function foo(a = [0]) { }
function bar(a = [0]) {
}
