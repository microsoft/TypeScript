// @target: es5

function f() {
    var { arguments: args } = { arguments };
    if (Math.random()) {
        return () => arguments;
    }
}