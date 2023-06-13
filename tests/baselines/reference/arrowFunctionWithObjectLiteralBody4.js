//// [tests/cases/compiler/arrowFunctionWithObjectLiteralBody4.ts] ////

//// [arrowFunctionWithObjectLiteralBody4.ts]
var v = a => <any><any>{}

//// [arrowFunctionWithObjectLiteralBody4.js]
var v = a => ({});
