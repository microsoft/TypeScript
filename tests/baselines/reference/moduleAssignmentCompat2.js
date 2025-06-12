//// [tests/cases/compiler/moduleAssignmentCompat2.ts] ////

//// [moduleAssignmentCompat2.ts]
module A {
    export class C { }
}
module B {
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
    B.D = D;
})(B || (B = {}));
var a;
var b;
a = b;
b = a; // error
