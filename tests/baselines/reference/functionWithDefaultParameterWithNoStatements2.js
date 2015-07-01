//// [functionWithDefaultParameterWithNoStatements2.ts]
function foo(x = 0) {
}

//// [functionWithDefaultParameterWithNoStatements2.js]
function foo(x) {
    if (x === void 0) { x = 0; }
}
