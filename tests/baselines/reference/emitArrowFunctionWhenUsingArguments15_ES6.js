//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments15_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments15_ES6.ts]
function f() {
    var arguments = "hello";
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments15_ES6.js]
"use strict";
function f() {
    var arguments = "hello";
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}
