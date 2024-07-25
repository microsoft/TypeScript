//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck10.ts] ////

//// [generatorTypeCheck10.ts]
function* g(): IterableIterator<any> {
    return;
}

//// [generatorTypeCheck10.js]
function* g() {
    return;
}
