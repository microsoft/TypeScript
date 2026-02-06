//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments06_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments06_ES6.ts]
function f(arguments) {
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments06_ES6.js]
"use strict";
function f(arguments) {
    var a = () => () => arguments;
}
