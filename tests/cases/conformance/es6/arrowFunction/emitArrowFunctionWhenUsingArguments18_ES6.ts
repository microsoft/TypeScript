// @target: es6

function f() {
    var { arguments: args } = { arguments };
    if (Math.random()) {
        return () => arguments;
    }
}