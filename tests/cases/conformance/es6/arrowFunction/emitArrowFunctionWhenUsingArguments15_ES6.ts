// @target: es6

function f() {
    var arguments = "hello";
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}