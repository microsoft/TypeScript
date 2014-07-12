//// [overloadOnConstInBaseWithBadImplementationInDerived.js]
var C = (function () {
    function C() {
    }
    C.prototype.x1 = function (a, callback) {
    };
    return C;
})();
