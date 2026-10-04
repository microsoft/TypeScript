//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck51.ts] ////

//// [generatorTypeCheck51.ts]
function* g() {
    function* h() {
        yield 0;
    }
}

//// [generatorTypeCheck51.js]
"use strict";
function* g() {
    function* h() {
        yield 0;
    }
}
