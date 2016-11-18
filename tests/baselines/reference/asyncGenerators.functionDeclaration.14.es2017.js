//// [asyncGenerators.functionDeclaration.14.es2017.ts]
async function * f() {
    yield * f();
}

//// [asyncGenerators.functionDeclaration.14.es2017.js]
async function* f() {
    yield* f();
}
