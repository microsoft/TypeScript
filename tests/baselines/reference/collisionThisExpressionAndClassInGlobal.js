//// [collisionThisExpressionAndClassInGlobal.ts]
class _this {
}
var f = () => this;

//// [collisionThisExpressionAndClassInGlobal.js]
var _this = this;
var _this = (function () {
    function _this() {
    }
    return _this;
}());
var f = function () { return _this; };
