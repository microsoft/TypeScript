//// [tests/cases/compiler/testContainerList.ts] ////

//// [testContainerList.ts]
// Regression test for #325
module A {
    class C {
        constructor(public d: {}) { }
    }
}


//// [testContainerList.js]
var A;
(function (A) {
    class C {
        d;
        constructor(d) {
            this.d = d;
        }
    }
})(A || (A = {}));
