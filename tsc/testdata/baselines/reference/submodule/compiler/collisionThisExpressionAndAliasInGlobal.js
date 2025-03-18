//// [tests/cases/compiler/collisionThisExpressionAndAliasInGlobal.ts] ////

//// [collisionThisExpressionAndAliasInGlobal.ts]
module a {
    export var b = 10;
}
var f = () => this;
import _this = a; // Error

//// [collisionThisExpressionAndAliasInGlobal.js]
var a;
(function (a) {
    a.b = 10;
})(a || (a = {}));
var f = () => this;
