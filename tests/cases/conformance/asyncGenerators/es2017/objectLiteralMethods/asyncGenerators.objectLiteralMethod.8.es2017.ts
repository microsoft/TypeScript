// @target: es2017
const x = {
    async * f() {
        async function * g() {
        }
    }
}