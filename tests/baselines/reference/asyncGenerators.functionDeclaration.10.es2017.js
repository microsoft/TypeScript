//// [asyncGenerators.functionDeclaration.10.es2017.ts]
async function * f() {
    async function * await() {
    }
}

//// [asyncGenerators.functionDeclaration.10.es2017.js]
async function* f() {
    async function* () { }
    await ();
    {
    }
}
