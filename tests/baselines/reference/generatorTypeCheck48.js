//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck48.ts] ////

//// [generatorTypeCheck48.ts]
function* g() {
    yield;
}

function* h() {
    yield undefined;
}


//// [generatorTypeCheck48.js]
function* g() {
    yield;
}
function* h() {
    yield undefined;
}
