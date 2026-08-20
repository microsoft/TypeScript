// @strict: false
// @ignoreDeprecations: 6.0
// @alwaysStrict: true, false
// @target: es5, es2015

function f() {
    if (Math.random()) {
        const arguments = 100;
        return () => arguments;
    }
}