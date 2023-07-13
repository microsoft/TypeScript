//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments05.ts] ////

//// [emitArrowFunctionWhenUsingArguments05.ts]
function f(arguments) {
    var a = () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments05.js]
function f(arguments) {
    var a = function () { return arguments; };
}
