//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments14_ES6.ts] ////

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
