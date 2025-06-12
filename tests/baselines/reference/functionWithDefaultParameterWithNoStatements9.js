//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements9.ts] ////

//// [functionWithDefaultParameterWithNoStatements9.ts]
function foo(a = console.log) { }

function bar(a = console.log) {
}

//// [functionWithDefaultParameterWithNoStatements9.js]
function foo(a = console.log) { }
function bar(a = console.log) {
}
