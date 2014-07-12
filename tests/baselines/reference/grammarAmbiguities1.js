//// [grammarAmbiguities1.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
    };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.bar = function () {
    };
    return B;
})();
function f(x) {
    return x;
}
function g(x) {
    return f(x);
}
g(7);

f(g(7));
f(g < A, B > 7);
f(g < A, B > +(7));
