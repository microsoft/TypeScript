//// [asyncGenerators.functionExpression.10.es2017.ts]
const f = async function * () {
    async function * await() {
    }
}

//// [asyncGenerators.functionExpression.10.es2017.js]
const f = async function* () {
    async function* () { }
    await ();
    {
    }
};
