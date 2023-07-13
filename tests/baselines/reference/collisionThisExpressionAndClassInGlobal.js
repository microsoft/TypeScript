//// [tests/cases/compiler/collisionThisExpressionAndClassInGlobal.ts] ////

//// [collisionThisExpressionAndClassInGlobal.ts]
class _this {
}
var f = () => this;

//// [collisionThisExpressionAndClassInGlobal.js]
var _this_1 = this;
var _this = /** @class */ (function () {
    function _this() {
    }
    return _this;
}());
var f = function () { return _this_1; };
