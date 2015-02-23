//// [functionWithDefaultParameterWithNoStatements10.ts]
function foo(a = [0]) { }

function bar(a = [0]) {
}

//// [functionWithDefaultParameterWithNoStatements10.js]
function foo(a) {
    if (a === void 0) { a = [0]; }
}
function bar(a) {
    if (a === void 0) { a = [0]; }
}
