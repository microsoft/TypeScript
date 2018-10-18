//// [emitArrowFunctionWhenUsingArguments16_ES6.ts]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        return () => arguments[0];
    }
    var arguments = "world";
}

//// [emitArrowFunctionWhenUsingArguments16_ES6.js]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        return () => arguments[0];
    }
    var arguments = "world";
}
