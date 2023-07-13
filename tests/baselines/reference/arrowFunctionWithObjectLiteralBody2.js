//// [tests/cases/compiler/arrowFunctionWithObjectLiteralBody2.ts] ////

//// [arrowFunctionWithObjectLiteralBody2.ts]
var v = a => <any><any>{}

//// [arrowFunctionWithObjectLiteralBody2.js]
var v = function (a) { return ({}); };
