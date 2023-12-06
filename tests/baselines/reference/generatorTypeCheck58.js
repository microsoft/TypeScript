//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck58.ts] ////

//// [generatorTypeCheck58.ts]
function* g() {
    class C {
        static x = yield 0;
    };
}

//// [generatorTypeCheck58.js]
function* g() {
    class C {
    }
    C.x = yield 0;
    ;
}
