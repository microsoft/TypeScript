//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements9.ts] ////

//// [functionWithDefaultParameterWithNoStatements9.ts]
function foo(a = console.log) { }

function bar(a = console.log) {
}

//// [functionWithDefaultParameterWithNoStatements9.js]
function foo(a) {
    if (a === void 0) { a = console.log; }
}
function bar(a) {
    if (a === void 0) { a = console.log; }
}
