//// [noImplicitAnyForMethodParameters.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (a) {
    };
    return C;
})();
var D = (function () {
    function D() {
    }
    D.prototype.foo = function (a) {
    };
    return D;
})();
