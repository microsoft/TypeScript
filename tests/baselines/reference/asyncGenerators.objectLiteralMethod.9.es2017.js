//// [asyncGenerators.objectLiteralMethod.9.es2017.ts]
const x = {
    async * f() {
        async function * yield() {
        }
    }
}

//// [asyncGenerators.objectLiteralMethod.9.es2017.js]
const x = {
    async *f() {
        async function* () { }
        yield () => {
        };
    }
};
