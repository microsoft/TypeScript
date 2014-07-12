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
