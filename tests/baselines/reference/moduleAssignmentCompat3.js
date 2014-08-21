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
