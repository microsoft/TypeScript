//// [tests/cases/compiler/testContainerList.ts] ////

//// [testContainerList.ts]
// Regression test for #325
namespace A {
    class C {
        constructor(public d: {}) { }
    }
}


//// [testContainerList.js]
"use strict";
// Regression test for #325
var A;
(function (A) {
    class C {
        d;
        constructor(d) {
            this.d = d;
        }
    }
})(A || (A = {}));
