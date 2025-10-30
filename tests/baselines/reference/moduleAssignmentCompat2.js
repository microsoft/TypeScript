//// [tests/cases/compiler/moduleAssignmentCompat2.ts] ////

//// [moduleAssignmentCompat2.ts]
namespace A {
    export class C { }
}
namespace B {
    export class C { }
    export class D { }
}

var a: A;
var b: B;

a = b;
b = a; // error

//// [moduleAssignmentCompat2.js]
var A;
(function (A) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    A.C = C;
})(A || (A = {}));
var B;
(function (B) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    B.C = C;
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    B.D = D;
})(B || (B = {}));
var a;
var b;
a = b;
b = a; // error
