//// [genericCloduleInModule2.js]
// BUG 756210
var A;
(function (A) {
    var B = (function () {
        function B() {
        }
        B.prototype.foo = function () {
        };
        B.bar = function () {
        };
        return B;
    })();
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
b.foo();
