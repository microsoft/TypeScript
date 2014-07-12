//// [moduleAssignmentCompat2.js]
var A;
(function (A) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    A.C = C;
})(A || (A = {}));
var B;
(function (B) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    B.C = C;
    var D = (function () {
        function D() {
        }
        return D;
    })();
    B.D = D;
})(B || (B = {}));

var a;
var b;

a = b;
b = a; // error
