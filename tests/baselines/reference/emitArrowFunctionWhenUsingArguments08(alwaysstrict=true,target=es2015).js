//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments08.ts] ////

//// [emitArrowFunctionWhenUsingArguments08.ts]
function f(arguments) {
    var a = () => (arguments) => arguments;
}

//// [emitArrowFunctionWhenUsingArguments08.js]
"use strict";
function f(arguments) {
    var a = () => (arguments) => arguments;
}
