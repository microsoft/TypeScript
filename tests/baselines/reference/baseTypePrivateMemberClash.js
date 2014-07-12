//// [baseTypePrivateMemberClash.js]
var X = (function () {
    function X() {
    }
    return X;
})();
var Y = (function () {
    function Y() {
    }
    return Y;
})();
