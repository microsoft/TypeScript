//// [functionWithDefaultParameterWithNoStatements4.ts]
function foo(a = ``) { }

function bar(a = ``) {
}

//// [functionWithDefaultParameterWithNoStatements4.js]
function foo(a) {
    if (a === void 0) { a = ""; }
}
function bar(a) {
    if (a === void 0) { a = ""; }
}
