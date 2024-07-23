//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck13.ts] ////

//// [generatorTypeCheck13.ts]
function* g(): IterableIterator<number, string> {
    yield 0;
    return "";
}

//// [generatorTypeCheck13.js]
function* g() {
    yield 0;
    return "";
}
