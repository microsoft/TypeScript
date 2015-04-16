//// [emitArrowFunctionWhenUsingArguments18.ts]

function f() {
    var { arguments: args } = { arguments };
    if (Math.random()) {
        return () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments18.js]
function f() {
    var _arguments = arguments;
    var args = ({ arguments: _arguments }).arguments;
    if (Math.random()) {
        return function () { return _arguments; };
    }
}
