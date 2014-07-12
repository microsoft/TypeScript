//// [scopeCheckInsidePublicMethod1.js]
var C = (function () {
    function C() {
    }
    C.prototype.a = function () {
        s = 1; // ERR
    };
    return C;
})();
