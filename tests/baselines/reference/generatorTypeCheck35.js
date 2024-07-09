//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck35.ts] ////

//// [generatorTypeCheck35.ts]
function* g() {
    yield 0;
    function g2() {
        return "";
    }
}

//// [generatorTypeCheck35.js]
function* g() {
    yield 0;
    function g2() {
        return "";
    }
}
