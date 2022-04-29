//// [collisionThisExpressionAndAmbientVarInGlobal.ts]
declare var _this: number; // no error as no code gen
var f = () => this;
_this = 10; // Error

//// [collisionThisExpressionAndAmbientVarInGlobal.js]
var _this_1 = this;
var f = function () { return _this_1; };
_this = 10; // Error
