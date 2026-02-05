//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck58.ts] ////

//// [generatorTypeCheck58.ts]
function* g() {
    class C {
        static x = yield 0;
    };
}

//// [generatorTypeCheck58.js]
"use strict";
function* g() {
    class C {
        static x = yield 0;
    }
    ;
}
