//// [emitArrowFunctionWhenUsingArguments15_ES6.ts]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments15_ES6.js]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}
