//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments18.ts] ////

//// [emitArrowFunctionWhenUsingArguments18.ts]
function f() {
    var { arguments: args } = { arguments };
    if (Math.random()) {
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments18.js]
"use strict";
function f() {
    var { arguments: args } = { arguments };
    if (Math.random()) {
        return () => arguments;
    }
}
