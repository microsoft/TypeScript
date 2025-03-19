//// [tests/cases/compiler/testContainerList.ts] ////

//// [testContainerList.ts]
// Regression test for #325
module A {
    class C {
        constructor(public d: {}) { }
    }
}


//// [testContainerList.js]
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
