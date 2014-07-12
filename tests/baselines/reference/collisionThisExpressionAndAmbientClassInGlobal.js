//// [collisionThisExpressionAndAmbientClassInGlobal.js]
var _this = this;
var f = function () {
    return _this;
};
var a = new _this(); // Error
