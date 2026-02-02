//// [tests/cases/compiler/functionWithDefaultParameterWithNoStatements16.ts] ////

//// [functionWithDefaultParameterWithNoStatements16.ts]
var v: any[];

function foo(a = bar()) { }

function bar(a = foo()) {
}

//// [functionWithDefaultParameterWithNoStatements16.js]
var v;
function foo(a = bar()) { }
function bar(a = foo()) {
}
