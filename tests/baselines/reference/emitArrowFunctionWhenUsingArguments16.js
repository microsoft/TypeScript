//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments16.ts] ////

//// [emitArrowFunctionWhenUsingArguments16.ts]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        return () => arguments[0];
    }
    var arguments = "world";
}

//// [emitArrowFunctionWhenUsingArguments16.js]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        return function () { return arguments[0]; };
    }
    var arguments = "world";
}
