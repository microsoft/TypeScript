//// [emitArrowFunctionWhenUsingArguments14.ts]
function f() {
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments14.js]
function f() {
    if (Math.random()) {
        var arguments_1 = 100;
        return function () { return arguments; };
    }
}
