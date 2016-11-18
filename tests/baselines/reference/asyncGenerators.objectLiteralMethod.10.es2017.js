//// [asyncGenerators.objectLiteralMethod.10.es2017.ts]
const x = {
    async * f() {
        async function * await() {
        }
    }
}

//// [asyncGenerators.objectLiteralMethod.10.es2017.js]
const x = {
    async *f() {
        async function* () { }
        await ();
        {
        }
    }
};
