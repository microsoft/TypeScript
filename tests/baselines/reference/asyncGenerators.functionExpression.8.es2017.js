//// [asyncGenerators.functionExpression.8.es2017.ts]
const f = async function * () {
    async function * g() {
    }
}

//// [asyncGenerators.functionExpression.8.es2017.js]
const f = async function* () {
    async function* g() {
    }
};
