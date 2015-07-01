//// [functionWithDefaultParameterWithNoStatements12.ts]
var v: any[];

function foo(a = (v)) { }

function bar(a = (v)) {
}

//// [functionWithDefaultParameterWithNoStatements12.js]
var v;
function foo(a) {
    if (a === void 0) { a = (v); }
}
function bar(a) {
    if (a === void 0) { a = (v); }
}
