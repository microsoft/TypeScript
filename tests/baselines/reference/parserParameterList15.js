//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList15.ts] ////

//// [parserParameterList15.ts]
function foo(a = 4);
function foo(a, b) {}

//// [parserParameterList15.js]
function foo(a, b) { }
