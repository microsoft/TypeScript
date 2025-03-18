//// [tests/cases/compiler/moduleAssignmentCompat1.ts] ////

//// [moduleAssignmentCompat1.ts]
module A {
    export class C { }
}
module B {
    export class C { }
    class D { }
}

var a: A;
var b: B;

// no error
a = b;
b = a;



//// [moduleAssignmentCompat1.js]
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
a = b;
b = a;
