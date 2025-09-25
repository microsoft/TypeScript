//// [tests/cases/compiler/testContainerList.ts] ////

//// [testContainerList.ts]
// Regression test for #325
namespace A {
    class C {
        constructor(public d: {}) { }
    }
}


//// [testContainerList.js]
// Regression test for #325
var A;
(function (A) {
    var C = /** @class */ (function () {
        function C(d) {
            this.d = d;
        }
        return C;
    }());
})(A || (A = {}));
