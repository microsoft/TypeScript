//// [tests/cases/conformance/parser/ecmascript5/parserNoASIOnCallAfterFunctionExpression1.ts] ////

//// [parserNoASIOnCallAfterFunctionExpression1.ts]
var x = function () { }
(<any>window).foo;


//// [parserNoASIOnCallAfterFunctionExpression1.js]
var x = function () { }(window).foo;
