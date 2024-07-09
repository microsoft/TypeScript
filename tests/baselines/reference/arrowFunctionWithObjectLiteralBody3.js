//// [tests/cases/compiler/arrowFunctionWithObjectLiteralBody3.ts] ////

//// [arrowFunctionWithObjectLiteralBody3.ts]
var v = a => <any>{}

//// [arrowFunctionWithObjectLiteralBody3.js]
var v = a => ({});
