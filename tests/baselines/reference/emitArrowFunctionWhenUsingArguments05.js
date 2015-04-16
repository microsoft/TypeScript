//// [emitArrowFunctionWhenUsingArguments05.ts]

function f(arguments) {
    var a = () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments05.js]
function f(_arguments) {
    var a = function () { return _arguments; };
}
