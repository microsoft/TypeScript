//// [emitArrowFunctionWhenUsingArguments11.ts]
function f(arguments) {
    var _arguments = 10;
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments11.js]
function f(arguments) {
    var _arguments = 10;
    var a = function () { return function () { return arguments; }; };
}
