//// [emitArrowFunctionWhenUsingArguments06_ES6.ts]
function f(arguments) {
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments06_ES6.js]
function f(arguments) {
    var a = () => () => arguments;
}
