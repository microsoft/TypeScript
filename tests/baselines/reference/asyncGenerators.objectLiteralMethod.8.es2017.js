//// [asyncGenerators.objectLiteralMethod.8.es2017.ts]
const x = {
    async * f() {
        async function * g() {
        }
    }
}

//// [asyncGenerators.objectLiteralMethod.8.es2017.js]
const x = {
    async *f() {
        async function* g() {
        }
    }
};
