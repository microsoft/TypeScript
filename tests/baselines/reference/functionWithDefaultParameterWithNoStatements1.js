//// [functionWithDefaultParameterWithNoStatements1.ts]
function foo(x = 0) { }

//// [functionWithDefaultParameterWithNoStatements1.js]
function foo(x) {
    if (x === void 0) { x = 0; }
}
