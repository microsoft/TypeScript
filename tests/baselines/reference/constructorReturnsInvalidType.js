//// [constructorReturnsInvalidType.js]
var X = (function () {
    function X() {
        return 1;
    }
    X.prototype.foo = function () {
    };
    return X;
})();

var x = new X();
