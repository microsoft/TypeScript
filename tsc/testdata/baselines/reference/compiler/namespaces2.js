//// [tests/cases/compiler/namespaces2.ts] ////

//// [namespaces2.ts]
namespace A {
    export namespace B {
        export class C { }
    }
}

var c: A.B.C = new A.B.C();

//// [namespaces2.js]
"use strict";
var A;
(function (A) {
    let B;
    (function (B) {
        class C {
        }
        B.C = C;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var c = new A.B.C();
