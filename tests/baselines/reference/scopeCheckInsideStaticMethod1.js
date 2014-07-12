//// [scopeCheckInsideStaticMethod1.js]
var C = (function () {
    function C() {
    }
    C.b = function () {
        v = 1; // ERR
        C.s = 1;
        this.p = 1; // ERR
    };
    return C;
})();
