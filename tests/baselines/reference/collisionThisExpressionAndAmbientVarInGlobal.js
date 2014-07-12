//// [collisionThisExpressionAndAmbientVarInGlobal.js]
var _this = this;
var f = function () {
    return _this;
};
_this = 10; // Error
