// @target: es5
// @lib: es2017
async function * f() {
    var x = { [yield]: 1 };
}