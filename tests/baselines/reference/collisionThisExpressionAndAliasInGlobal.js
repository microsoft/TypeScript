//// [collisionThisExpressionAndAliasInGlobal.js]
var _this = this;
var a;
(function (a) {
    a.b = 10;
})(a || (a = {}));
var f = function () {
    return _this;
};
var _this = a; // Error
