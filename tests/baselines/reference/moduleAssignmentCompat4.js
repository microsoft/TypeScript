//// [moduleAssignmentCompat4.js]
var A;
(function (A) {
    (function (M) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
    })(A.M || (A.M = {}));
    var M = A.M;
})(A || (A = {}));
var B;
(function (B) {
    (function (M) {
        var D = (function () {
            function D() {
            }
            return D;
        })();
        M.D = D;
    })(B.M || (B.M = {}));
    var M = B.M;
})(B || (B = {}));

var a;
var b;

a = b;
b = a; // error
