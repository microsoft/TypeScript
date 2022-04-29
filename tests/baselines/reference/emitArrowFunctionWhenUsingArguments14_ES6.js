//// [emitArrowFunctionWhenUsingArguments14_ES6.ts]
function f() {
    if (Math.random()) {
        let arguments = 100;
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments14_ES6.js]
function f() {
    if (Math.random()) {
        let arguments = 100;
        return () => arguments;
    }
}
