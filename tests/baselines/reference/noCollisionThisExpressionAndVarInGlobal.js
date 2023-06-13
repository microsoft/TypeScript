//// [tests/cases/compiler/noCollisionThisExpressionAndVarInGlobal.ts] ////

//// [noCollisionThisExpressionAndVarInGlobal.ts]
var _this = 1;
var f = () => _this;

//// [noCollisionThisExpressionAndVarInGlobal.js]
var _this = 1;
var f = function () { return _this; };
