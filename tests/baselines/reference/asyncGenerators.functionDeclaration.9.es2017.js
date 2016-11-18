//// [asyncGenerators.functionDeclaration.9.es2017.ts]
async function * f() {
    async function * yield() {
    }
}

//// [asyncGenerators.functionDeclaration.9.es2017.js]
async function* f() {
    async function* () { }
    yield () => {
    };
}
