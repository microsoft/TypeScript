//// [tests/cases/conformance/parser/ecmascript5/Statements/ReturnStatements/parserReturnStatement4.ts] ////

//// [parserReturnStatement4.ts]
var v = { get foo() { return } };

//// [parserReturnStatement4.js]
var v = { get foo() { return; } };
