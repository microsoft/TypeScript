// @target: es6

function f() {
    if (Math.random()) {
        let arguments = 100;
        return () => arguments;
    }
}