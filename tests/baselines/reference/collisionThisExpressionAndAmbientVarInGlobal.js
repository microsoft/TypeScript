//// [collisionThisExpressionAndAmbientVarInGlobal.ts]
declare var _this: number; // no error as no code gen
var f = () => this;
_this = 10; // Error

//// [collisionThisExpressionAndAmbientVarInGlobal.js]
var _this = this;
var f = function () { return _this; };
_this = 10; // Error
