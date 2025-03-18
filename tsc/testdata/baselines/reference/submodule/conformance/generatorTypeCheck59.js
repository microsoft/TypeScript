//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck59.ts] ////

//// [generatorTypeCheck59.ts]
function* g() {
    class C {
        @(yield "")
        m() { }
    };
}

//// [generatorTypeCheck59.js]
function* g() {
    class C {
        @(yield "")
        m() { }
    }
    ;
}
