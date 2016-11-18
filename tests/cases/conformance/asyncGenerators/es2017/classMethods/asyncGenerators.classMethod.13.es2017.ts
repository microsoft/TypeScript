// @target: es2017
class C {
    async * f() {
        yield * [];
    }
}