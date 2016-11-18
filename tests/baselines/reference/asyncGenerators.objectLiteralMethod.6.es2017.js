//// [asyncGenerators.objectLiteralMethod.6.es2017.ts]
const x = {
    async * f(a = await 1) {}
}

//// [asyncGenerators.objectLiteralMethod.6.es2017.js]
const x = {
    async *f(a = await 1) { }
};
