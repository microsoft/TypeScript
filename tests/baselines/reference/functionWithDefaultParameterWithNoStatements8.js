//// [functionWithDefaultParameterWithNoStatements8.ts]
function foo(a = undefined) { }

function bar(a = undefined) {
}

//// [functionWithDefaultParameterWithNoStatements8.js]
function foo(a) {
    if (a === void 0) { a = undefined; }
}
function bar(a) {
    if (a === void 0) { a = undefined; }
}
