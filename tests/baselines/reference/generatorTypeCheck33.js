//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck33.ts] ////

//// [generatorTypeCheck33.ts]
function* g() {
    yield 0;
    function* g2() {
        yield "";
    }
}

//// [generatorTypeCheck33.js]
function* g() {
    yield 0;
    function* g2() {
        yield "";
    }
}
