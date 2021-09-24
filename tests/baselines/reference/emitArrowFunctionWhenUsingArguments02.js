//// [emitArrowFunctionWhenUsingArguments02.ts]
var a = () => arguments;

//// [emitArrowFunctionWhenUsingArguments02.js]
var a = function a() { return arguments; };
