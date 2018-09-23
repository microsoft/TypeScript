//// [collisionThisExpressionAndAliasInGlobal.ts]
module a {
    export var b = 10;
}
var f = () => this;
import _this = a; // Error

//// [collisionThisExpressionAndAliasInGlobal.js]
var _this_1 = this;
var a = a || (a = {});
(function (a) {
    a.b = 10;
})(a);
var f = function () { return _this_1; };
var _this = a; // Error
