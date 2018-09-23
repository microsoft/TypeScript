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
var A = A || (A = {});
(function (A) {
    var M = A.M || (A.M = {});
    (function (M) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
    })(M);
})(A);
var B = B || (B = {});
(function (B) {
    var M = B.M || (B.M = {});
    (function (M) {
        var D = /** @class */ (function () {
            function D() {
            }
            return D;
        }());
        M.D = D;
    })(M);
})(B);
var a;
var b;
a = b;
b = a; // error
