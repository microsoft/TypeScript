//// [emitArrowFunctionWhenUsingArguments09_ES6.ts]
function f(_arguments) {
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments09_ES6.js]
function f(_arguments) {
    var a = () => () => arguments;
}
