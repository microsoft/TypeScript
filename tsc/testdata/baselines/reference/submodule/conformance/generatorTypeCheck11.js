//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck11.ts] ////

//// [generatorTypeCheck11.ts]
function* g(): IterableIterator<number, number> {
    return 0;
}

//// [generatorTypeCheck11.js]
function* g() {
    return 0;
}
