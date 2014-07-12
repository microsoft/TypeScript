//// [propertyAndFunctionWithSameName.js]
var C = (function () {
    function C() {
    }
    C.prototype.x = function () {
        return 1;
    };
    return C;
})();

var D = (function () {
    function D() {
    }
    D.prototype.x = function (v) {
    };
    return D;
})();
