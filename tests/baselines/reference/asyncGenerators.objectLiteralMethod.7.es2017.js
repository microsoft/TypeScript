//// [asyncGenerators.objectLiteralMethod.7.es2017.ts]
const x = {
    async * f(a = yield) {}
}

//// [asyncGenerators.objectLiteralMethod.7.es2017.js]
const x = {
    async *f(a = yield) { }
};
