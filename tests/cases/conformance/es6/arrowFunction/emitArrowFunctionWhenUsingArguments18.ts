// @target: es5, es2015

function f() {
    var { arguments: args } = { arguments };
    if (Math.random()) {
        return () => arguments;
    }
}