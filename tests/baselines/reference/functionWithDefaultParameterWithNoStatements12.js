//// [functionWithDefaultParameterWithNoStatements12.ts]
var v: any[];

function foo(a = (v)) { }

function bar(a = (v)) {
}

//// [functionWithDefaultParameterWithNoStatements12.js]
var v;
function foo(a) { }
function bar(a) {
}
