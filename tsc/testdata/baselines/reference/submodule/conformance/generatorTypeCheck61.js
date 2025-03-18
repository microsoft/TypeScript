//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck61.ts] ////

//// [generatorTypeCheck61.ts]
function * g() {
    @(yield 0)
    class C {};
}

//// [generatorTypeCheck61.js]
function* g() {
    @(yield 0)
    class C {
    }
    ;
}
