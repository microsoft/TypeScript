//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments06.ts] ////

//// [emitArrowFunctionWhenUsingArguments06.ts]
function f(arguments) {
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments06.js]
"use strict";
function f(arguments) {
    var a = () => () => arguments;
}
