//// [asyncGenerators.functionExpression.9.es2017.ts]
const f = async function * () {
    async function * yield() {
    }
}

//// [asyncGenerators.functionExpression.9.es2017.js]
const f = async function* () {
    async function* () { }
    yield () => {
    };
};
