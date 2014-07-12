//// [namespaces2.ts]
module A {
    export module B {
        export class C { }
    }
}

var c: A.B.C = new A.B.C();

//// [namespaces2.js]
var A;
(function (A) {
    (function (B) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        B.C = C;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var c = new A.B.C();
