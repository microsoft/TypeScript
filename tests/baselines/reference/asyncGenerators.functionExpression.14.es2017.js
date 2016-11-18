//// [asyncGenerators.functionExpression.14.es2017.ts]
const f = async function * () {
    yield * f();
}

//// [asyncGenerators.functionExpression.14.es2017.js]
const f = async function* () {
    yield* f();
};
