//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments08.ts] ////

//// [emitArrowFunctionWhenUsingArguments08.ts]
function f(arguments) {
    var a = () => (arguments) => arguments;
}

//// [emitArrowFunctionWhenUsingArguments08.js]
function f(arguments) {
    var a = function () { return function (arguments) { return arguments; }; };
}
