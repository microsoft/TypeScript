//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck34.ts] ////

//// [generatorTypeCheck34.ts]
function* g() {
    yield 0;
    function* g2() {
        return "";
    }
}

//// [generatorTypeCheck34.js]
function* g() {
    yield 0;
    function* g2() {
        return "";
    }
}
