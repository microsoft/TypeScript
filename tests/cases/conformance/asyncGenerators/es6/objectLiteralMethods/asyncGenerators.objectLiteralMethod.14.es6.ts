// @target: es6
// @lib: es2017
declare const ai: AsyncIterable<number>;
const x = {
    async * f() {
        yield * ai;
    }
}