//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments04_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments04_ES6.ts]
function f() {
    var arguments;
    var a = () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments04_ES6.js]
function f() {
    var arguments;
    var a = () => arguments;
}
