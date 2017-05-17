//// [emitArrowFunctionWhenUsingArguments04.ts]
function f() {
    var arguments;
    var a = () => arguments;
}

//// [emitArrowFunctionWhenUsingArguments04.js]
function f() {
    var arguments;
    var a = function a() { return arguments; };
}
