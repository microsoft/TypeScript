//// [emitArrowFunctionWhenUsingArguments15.ts]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments15.js]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        var arguments_1 = 100;
        return function () { return arguments; };
    }
}
