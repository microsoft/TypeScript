//// [emitArrowFunctionWhenUsingArguments17.ts]

function f() {
    var { arguments } = { arguments: "hello" };
    if (Math.random()) {
        return () => arguments[0];
    }
    var arguments = "world";
}

//// [emitArrowFunctionWhenUsingArguments17.js]
function f() {
    var _arguments = ({ arguments: "hello" }).arguments;
    if (Math.random()) {
        return function () { return _arguments[0]; };
    }
    var _arguments = "world";
}
