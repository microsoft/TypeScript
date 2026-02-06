//// [tests/cases/compiler/moduleAssignmentCompat1.ts] ////

//// [moduleAssignmentCompat1.ts]
namespace A {
    export class C { }
}
namespace B {
    export class C { }
    class D { }
}

var a: A;
var b: B;

// no error
a = b;
b = a;



//// [moduleAssignmentCompat1.js]
"use strict";
var A;
(function (A) {
    class C {
    }
    A.C = C;
})(A || (A = {}));
var B;
(function (B) {
    class C {
    }
    B.C = C;
    class D {
    }
})(B || (B = {}));
var a;
var b;
// no error
a = b;
b = a;
