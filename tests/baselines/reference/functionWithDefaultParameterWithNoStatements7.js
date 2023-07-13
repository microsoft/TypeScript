//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements7.ts] ////

//// [functionWithDefaultParameterWithNoStatements7.ts]
function foo(a = false) { }

function bar(a = false) {
}

//// [functionWithDefaultParameterWithNoStatements7.js]
function foo(a) {
    if (a === void 0) { a = false; }
}
function bar(a) {
    if (a === void 0) { a = false; }
}
