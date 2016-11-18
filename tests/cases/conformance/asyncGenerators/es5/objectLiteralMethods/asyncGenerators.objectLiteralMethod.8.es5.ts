// @target: es5
// @lib: es2017
const x = {
    async * f() {
        async function * g() {
        }
    }
}