//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck57.ts] ////

//// [generatorTypeCheck57.ts]
function* g() {
    class C {
        x = yield 0;
    };
}

//// [generatorTypeCheck57.js]
"use strict";
function* g() {
    class C {
        x = yield 0;
    }
    ;
}
