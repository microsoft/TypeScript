//// [emitArrowFunctionWhenUsingArguments10.ts]
function f() {
    var _arguments = 10;
    var a = () => () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments10.js]
function f() {
    var _arguments = 10;
    var a = function () { return function () { return arguments; }; };
}
