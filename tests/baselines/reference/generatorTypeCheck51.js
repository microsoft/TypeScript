//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck51.ts] ////

//// [generatorTypeCheck51.ts]
function* g() {
    function* h() {
        yield 0;
    }
}

//// [generatorTypeCheck51.js]
function* g() {
    function* h() {
        yield 0;
    }
}
