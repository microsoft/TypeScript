//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments07_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments07_ES6.ts]
function f(arguments) {
    var a = (arguments) => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments07_ES6.js]
function f(arguments) {
    var a = (arguments) => () => arguments;
}
