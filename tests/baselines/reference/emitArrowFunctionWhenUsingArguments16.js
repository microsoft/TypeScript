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
    var _arguments = "hello";
    if (Math.random()) {
        return function () { return _arguments[0]; };
    }
    var _arguments = "world";
}
