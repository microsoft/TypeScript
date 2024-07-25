//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments07.ts] ////

//// [emitArrowFunctionWhenUsingArguments07.ts]
function f(arguments) {
    var a = (arguments) => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments07.js]
function f(arguments) {
    var a = function (arguments) { return function () { return arguments; }; };
}
