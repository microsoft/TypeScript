//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck40.ts] ////

//// [generatorTypeCheck40.ts]
function* g() {
    class C extends (yield 0) { }
}

//// [generatorTypeCheck40.js]
function* g() {
    class C extends (yield 0) {
    }
}
