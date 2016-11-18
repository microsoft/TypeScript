// @target: es2017
const x = {
    async * f() {
        var x = { [yield]: 1 };
    }
}