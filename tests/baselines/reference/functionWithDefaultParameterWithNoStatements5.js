//// [functionWithDefaultParameterWithNoStatements5.ts]
function foo(a = 0) { }

function bar(a = 0) {
}

//// [functionWithDefaultParameterWithNoStatements5.js]
function foo(a) {
    if (a === void 0) { a = 0; }
}
function bar(a) {
    if (a === void 0) { a = 0; }
}
