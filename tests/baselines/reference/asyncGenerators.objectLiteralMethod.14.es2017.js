//// [asyncGenerators.objectLiteralMethod.14.es2017.ts]
declare const ai: AsyncIterable<number>;
const x = {
    async * f() {
        yield * ai;
    }
}

//// [asyncGenerators.objectLiteralMethod.14.es2017.js]
const x = {
    async *f() {
        yield* ai;
    }
};
