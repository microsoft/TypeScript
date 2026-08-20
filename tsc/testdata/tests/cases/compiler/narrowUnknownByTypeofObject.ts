// @target: es2015
// @strictNullChecks: true
function foo(x: unknown) {
    if (typeof x === "object") {
        x
    }
}
