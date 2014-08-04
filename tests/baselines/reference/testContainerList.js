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
    var C = (function () {
        function C(d) {
            this.d = d;
        }
        return C;
    })();
})(A || (A = {}));
