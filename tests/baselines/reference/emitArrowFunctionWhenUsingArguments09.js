//// [emitArrowFunctionWhenUsingArguments09.ts]
function f(_arguments) {
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments09.js]
function f(_arguments) {
    var a = function () { return function () { return arguments; }; };
}
