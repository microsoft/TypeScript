//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments04.ts] ////

//// [emitArrowFunctionWhenUsingArguments04.ts]
function f() {
    var arguments;
    var a = () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments04.js]
function f() {
    var arguments;
    var a = function () { return arguments; };
}
