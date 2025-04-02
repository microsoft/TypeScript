//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck37.ts] ////

//// [generatorTypeCheck37.ts]
function* g() {
    return yield yield 0;
}

//// [generatorTypeCheck37.js]
function* g() {
    return yield yield 0;
}
