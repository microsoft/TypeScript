//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments03.ts] ////

//// [emitArrowFunctionWhenUsingArguments03.ts]
var arguments;
var a = () => arguments;

//// [emitArrowFunctionWhenUsingArguments03.js]
var arguments;
var a = function () { return arguments; };
