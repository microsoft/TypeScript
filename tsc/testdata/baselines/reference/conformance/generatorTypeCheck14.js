//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck14.ts] ////

//// [generatorTypeCheck14.ts]
function* g() {
    yield 0;
    return "";
}

//// [generatorTypeCheck14.js]
"use strict";
function* g() {
    yield 0;
    return "";
}
