//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck50.ts] ////

//// [generatorTypeCheck50.ts]
function* g() {
    yield yield;
}

//// [generatorTypeCheck50.js]
function* g() {
    yield yield;
}
