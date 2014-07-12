//// [collisionThisExpressionAndLocalVarInMethod.js]
var a = (function () {
    function a() {
    }
    a.prototype.method1 = function () {
        var _this = this;
        return {
            doStuff: function (callback) {
                return function () {
                    var _this = 2;
                    return callback(_this);
                };
            }
        };
    };
    a.prototype.method2 = function () {
        var _this = this;
        var _this = 2;
        return {
            doStuff: function (callback) {
                return function () {
                    return callback(_this);
                };
            }
        };
    };
    return a;
})();
