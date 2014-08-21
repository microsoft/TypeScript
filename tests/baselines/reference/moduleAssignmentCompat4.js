//// [moduleAssignmentCompat4.ts]
module A {
   export module M {
        class C { }
    }
}
module B {
    export module M {
        export class D { }
    }
}

var a: A;
var b: B;

a = b;
b = a; // error

//// [moduleAssignmentCompat4.js]
var A;
(function (A) {
    (function (M) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
    })(A.M || (A.M = {}));
    var M = A.M;
})(A || (A = {}));
var B;
(function (B) {
    (function (M) {
        var D = (function () {
            function D() {
            }
            return D;
        })();
        M.D = D;
    })(B.M || (B.M = {}));
    var M = B.M;
})(B || (B = {}));
var a;
var b;
a = b;
b = a; // error
