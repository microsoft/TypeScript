//// [collisionThisExpressionAndFunctionInGlobal.js]
var _this = this;
function _this() {
    return 10;
}
var f = function () {
    return _this;
};
