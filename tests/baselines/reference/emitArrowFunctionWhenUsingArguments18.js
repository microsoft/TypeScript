//// [emitArrowFunctionWhenUsingArguments18.ts]
function f() {
    var { arguments: args } = { arguments };
    if (Math.random()) {
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments18.js]
function f() {
    var args = { arguments: arguments }.arguments;
    if (Math.random()) {
        return function () { return arguments; };
    }
}
