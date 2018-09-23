//// [moduleAssignmentCompat3.ts]
module A {
    export var x = 1;
}
module B {
    export var x = "";
}

var a: A;
var b: B;

// both errors
a = b;
b = a;


//// [moduleAssignmentCompat3.js]
var A = A || (A = {});
(function (A) {
    A.x = 1;
})(A);
var B = B || (B = {});
(function (B) {
    B.x = "";
})(B);
var a;
var b;
// both errors
a = b;
b = a;
