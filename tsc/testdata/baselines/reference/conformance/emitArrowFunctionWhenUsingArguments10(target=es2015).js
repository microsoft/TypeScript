//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments10.ts] ////

//// [emitArrowFunctionWhenUsingArguments10.ts]
function f() {
    var _arguments = 10;
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments10.js]
"use strict";
function f() {
    var _arguments = 10;
    var a = () => () => arguments;
}
