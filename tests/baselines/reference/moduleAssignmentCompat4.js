//// [tests/cases/compiler/moduleAssignmentCompat4.ts] ////

//// [moduleAssignmentCompat4.ts]
namespace A {
   export namespace M {
        class C { }
    }
}
namespace B {
    export namespace M {
        export class D { }
    }
}

var a: A;
var b: B;

a = b;
b = a; // error

//// [moduleAssignmentCompat4.js]
"use strict";
var A;
(function (A) {
    let M;
    (function (M) {
        class C {
        }
    })(M = A.M || (A.M = {}));
})(A || (A = {}));
var B;
(function (B) {
    let M;
    (function (M) {
        class D {
        }
        M.D = D;
    })(M = B.M || (B.M = {}));
})(B || (B = {}));
var a;
var b;
a = b;
b = a; // error
