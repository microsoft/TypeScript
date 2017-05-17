//// [emitArrowFunctionWhenUsingArguments08.ts]
function f(arguments) {
    var a = () => (arguments) => arguments;
}

//// [emitArrowFunctionWhenUsingArguments08.js]
function f(arguments) {
    var a = function a() { return function (arguments) { return arguments; }; };
}
