//// [namespaces2.ts]
module A {
    export module B {
        export class C { }
    }
}

var c: A.B.C = new A.B.C();

//// [namespaces2.js]
var A = A || (A = {});
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        var C = /** @class */ (function () {
            function C() {
            }
            return C;
        }());
        B.C = C;
    })(B);
})(A);
var c = new A.B.C();
