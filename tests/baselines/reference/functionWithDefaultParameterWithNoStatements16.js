//// [functionWithDefaultParameterWithNoStatements16.ts]
var v: any[];

function foo(a = bar()) { }

function bar(a = foo()) {
}

//// [functionWithDefaultParameterWithNoStatements16.js]
var v;
function foo(a) {
    if (a === void 0) { a = bar(); }
}
function bar(a) {
    if (a === void 0) { a = foo(); }
}
