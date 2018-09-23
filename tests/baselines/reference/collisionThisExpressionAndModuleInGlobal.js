//// [collisionThisExpressionAndModuleInGlobal.ts]
module _this { //Error
    class c {
    }
}
var f = () => this;

//// [collisionThisExpressionAndModuleInGlobal.js]
var _this_1 = this;
var _this = _this || (_this = {});
(function (_this) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
})(_this);
var f = function () { return _this_1; };
