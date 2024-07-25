//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck36.ts] ////

//// [generatorTypeCheck36.ts]
function* g() {
    yield yield 0;
}

//// [generatorTypeCheck36.js]
function* g() {
    yield yield 0;
}
