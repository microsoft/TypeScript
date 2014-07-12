//// [genericTypeWithNonGenericBaseMisMatch.js]
var X = (function () {
    function X() {
    }
    X.prototype.f = function (a) {
    };
    return X;
})();
var x = new X();
var i = x;
