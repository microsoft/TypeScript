//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments13_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments13_ES6.ts]
function f() {
    var _arguments = 10;
    var a = (arguments) => () => _arguments;
}

//// [emitArrowFunctionWhenUsingArguments13_ES6.js]
function f() {
    var _arguments = 10;
    var a = (arguments) => () => _arguments;
}
