//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments13.ts] ////

//// [emitArrowFunctionWhenUsingArguments13.ts]
function f() {
    var _arguments = 10;
    var a = (arguments) => () => _arguments;
}

//// [emitArrowFunctionWhenUsingArguments13.js]
function f() {
    var _arguments = 10;
    var a = function (arguments) { return function () { return _arguments; }; };
}
