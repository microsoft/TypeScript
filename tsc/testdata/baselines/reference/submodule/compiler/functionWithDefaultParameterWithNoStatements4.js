//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements4.ts] ////

//// [functionWithDefaultParameterWithNoStatements4.ts]
function foo(a = ``) { }

function bar(a = ``) {
}

//// [functionWithDefaultParameterWithNoStatements4.js]
"use strict";
function foo(a = ``) { }
function bar(a = ``) {
}
