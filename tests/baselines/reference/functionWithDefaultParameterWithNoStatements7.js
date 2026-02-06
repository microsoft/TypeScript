//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements7.ts] ////

//// [functionWithDefaultParameterWithNoStatements7.ts]
function foo(a = false) { }

function bar(a = false) {
}

//// [functionWithDefaultParameterWithNoStatements7.js]
"use strict";
function foo(a = false) { }
function bar(a = false) {
}
