//// [functionWithDefaultParameterWithNoStatements6.ts]
function foo(a = true) { }

function bar(a = true) {
}

//// [functionWithDefaultParameterWithNoStatements6.js]
function foo(a) {
    if (a === void 0) { a = true; }
}
function bar(a) {
    if (a === void 0) { a = true; }
}
