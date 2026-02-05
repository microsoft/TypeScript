//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments05_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments05_ES6.ts]
function f(arguments) {
    var a = () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments05_ES6.js]
function f(arguments) {
    var a = () => arguments;
}
