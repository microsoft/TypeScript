//// [tests/cases/compiler/moduleAssignmentCompat3.ts] ////

//// [moduleAssignmentCompat3.ts]
namespace A {
    export var x = 1;
}
namespace B {
    export var x = "";
}

var a: A;
var b: B;

// both errors
a = b;
b = a;


//// [moduleAssignmentCompat3.js]
var A;
(function (A) {
    A.x = 1;
})(A || (A = {}));
var B;
(function (B) {
    B.x = "";
})(B || (B = {}));
var a;
var b;
// both errors
a = b;
b = a;
