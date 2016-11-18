//// [asyncGenerators.classMethod.14.es2017.ts]
declare const ai: AsyncIterable<number>;
class C {
    async * f() {
        yield * ai;
    }
}

//// [asyncGenerators.classMethod.14.es2017.js]
class C {
    async *f() {
        yield* ai;
    }
}
