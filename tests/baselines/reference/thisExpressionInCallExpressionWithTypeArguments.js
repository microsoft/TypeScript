//// [thisExpressionInCallExpressionWithTypeArguments.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var _this = this;
        [1, 2, 3].map(function (x) {
            return _this;
        });
    };
    return C;
})();
