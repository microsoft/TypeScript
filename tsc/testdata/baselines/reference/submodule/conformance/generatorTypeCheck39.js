//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck39.ts] ////

//// [generatorTypeCheck39.ts]
function decorator(x: any) {
    return y => { };
}
function* g() {
    @decorator(yield 0)
    class C {
        x = yield 0;
    }
}

//// [generatorTypeCheck39.js]
function decorator(x) {
    return y => { };
}
function* g() {
    @decorator(yield 0)
    class C {
        x = yield 0;
    }
}
