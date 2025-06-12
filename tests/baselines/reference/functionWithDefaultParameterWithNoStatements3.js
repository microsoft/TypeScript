//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements3.ts] ////

//// [functionWithDefaultParameterWithNoStatements3.ts]
function foo(a = "") { }

function bar(a = "") {
}

//// [functionWithDefaultParameterWithNoStatements3.js]
function foo(a = "") { }
function bar(a = "") {
}
