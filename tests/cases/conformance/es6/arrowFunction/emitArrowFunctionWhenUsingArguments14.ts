// @target: es5

function f() {
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}