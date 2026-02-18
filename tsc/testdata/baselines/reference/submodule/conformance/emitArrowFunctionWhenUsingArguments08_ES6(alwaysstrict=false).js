//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments08_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments08_ES6.ts]
function f(arguments) {
    var a = () => (arguments) => arguments;
}

//// [emitArrowFunctionWhenUsingArguments08_ES6.js]
"use strict";
function f(arguments) {
    var a = () => (arguments) => arguments;
}
