//// [functionWithDefaultParameterWithNoStatements11.ts]
var v: any[];

function foo(a = v[0]) { }

function bar(a = v[0]) {
}

//// [functionWithDefaultParameterWithNoStatements11.js]
var v;
function foo(a) {
    if (a === void 0) { a = v[0]; }
}
function bar(a) {
    if (a === void 0) { a = v[0]; }
}
