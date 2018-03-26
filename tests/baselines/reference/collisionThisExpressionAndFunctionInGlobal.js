//// [collisionThisExpressionAndFunctionInGlobal.ts]
function _this() { //Error
    return 10;
}
var f = () => this;

//// [collisionThisExpressionAndFunctionInGlobal.js]
var _this_1 = this;
function _this() {
    return 10;
}
var f = function () { return _this_1; };
