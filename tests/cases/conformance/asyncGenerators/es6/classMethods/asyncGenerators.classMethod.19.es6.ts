// @target: es6
// @lib: es2017
class C {
    async * f() {
        var x = { [yield]: 1 };
    }
}