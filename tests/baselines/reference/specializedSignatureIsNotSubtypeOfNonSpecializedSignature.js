//// [specializedSignatureIsNotSubtypeOfNonSpecializedSignature.js]
// Specialized signatures must be a subtype of a non-specialized signature
// All the below should be errors
function foo(x) {
}

var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
    };
    return C;
})();

var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function (x) {
    };
    return C2;
})();

var C3 = (function () {
    function C3() {
    }
    C3.prototype.foo = function (x) {
    };
    return C3;
})();

var a;

var a2;

var a3;
