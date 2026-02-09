//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments10_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments10_ES6.ts]
function f() {
    var _arguments = 10;
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments10_ES6.js]
"use strict";
function f() {
    var _arguments = 10;
    var a = () => () => arguments;
}
