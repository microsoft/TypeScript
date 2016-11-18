// @target: es5
// @lib: es2017
declare const ai: AsyncIterable<number>;
class C {
    async * f() {
        yield * ai;
    }
}