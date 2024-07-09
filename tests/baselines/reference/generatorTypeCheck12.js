//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck12.ts] ////

//// [generatorTypeCheck12.ts]
function* g(): IterableIterator<number> {
    return "";
}

//// [generatorTypeCheck12.js]
function* g() {
    return "";
}
