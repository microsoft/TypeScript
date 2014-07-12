//// [genericFunduleInModule2.js]
// BUG 756210
var A;
(function (A) {
    function B(x) {
        return x;
    }
    A.B = B;
})(A || (A = {}));

var A;
(function (A) {
    (function (B) {
        B.x = 1;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var b;
A.B(1);
