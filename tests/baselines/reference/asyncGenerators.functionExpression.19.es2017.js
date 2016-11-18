//// [asyncGenerators.functionExpression.19.es2017.ts]
const f = async function *() {
    var x = { [yield]: 1 };
}

//// [asyncGenerators.functionExpression.19.es2017.js]
const f = async function* () {
    var x = { [yield]: 1 };
};
