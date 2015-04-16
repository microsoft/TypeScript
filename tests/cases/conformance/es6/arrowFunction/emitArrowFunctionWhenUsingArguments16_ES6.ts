// @target: es6

function f() {
    var arguments = "hello";
    if (Math.random()) {
        return () => arguments[0];
    }
    var arguments = "world";
}