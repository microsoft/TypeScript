//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of19.ts] ////

//// [ES5For-of19.ts]
for (let v of []) {
    v;
    function foo() {
        for (const v of []) {
            v;
        }
    }
}


//// [ES5For-of19.js]
"use strict";
for (let v of []) {
    v;
    function foo() {
        for (const v of []) {
            v;
        }
    }
}
