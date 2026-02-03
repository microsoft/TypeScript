//// [tests/cases/compiler/moduleAssignmentCompat4.ts] ////

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
    var M;
    (function (M) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
    })(M = A.M || (A.M = {}));
})(A || (A = {}));
var B;
(function (B) {
    var M;
    (function (M) {
        var D = /** @class */ (function () {
            function D() {
            }
            return D;
        }());
        M.D = D;
    })(M = B.M || (B.M = {}));
})(B || (B = {}));
var a;
var b;
a = b;
b = a; // error
