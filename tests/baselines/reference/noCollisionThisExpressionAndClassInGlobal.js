//// [tests/cases/compiler/noCollisionThisExpressionAndClassInGlobal.ts] ////

//// [noCollisionThisExpressionAndClassInGlobal.ts]
class _this {
}
var f = () => _this;

//// [noCollisionThisExpressionAndClassInGlobal.js]
var _this = /** @class */ (function () {
    function _this() {
    }
    return _this;
}());
var f = function () { return _this; };
