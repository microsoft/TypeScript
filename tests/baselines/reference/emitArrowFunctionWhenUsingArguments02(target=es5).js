//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments02.ts] ////

//// [emitArrowFunctionWhenUsingArguments02.ts]
var a = () => arguments;

//// [emitArrowFunctionWhenUsingArguments02.js]
var a = function () { return arguments; };
