//// [emitArrowFunctionWhenUsingArguments03.ts]

var arguments;
var a = () => arguments;

//// [emitArrowFunctionWhenUsingArguments03.js]
var _arguments;
var a = function () { return _arguments; };
