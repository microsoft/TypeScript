//// [emitArrowFunctionWhenUsingArguments06.ts]
function f(arguments) {
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments06.js]
function f(arguments) {
    var a = function () { return function () { return arguments; }; };
}
