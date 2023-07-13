//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements14.ts] ////

//// [functionWithDefaultParameterWithNoStatements14.ts]
var v: any[];

function foo(a = v[1 + 1]) { }

function bar(a = v[1 + 1]) {
}

//// [functionWithDefaultParameterWithNoStatements14.js]
var v;
function foo(a) {
    if (a === void 0) { a = v[1 + 1]; }
}
function bar(a) {
    if (a === void 0) { a = v[1 + 1]; }
}
