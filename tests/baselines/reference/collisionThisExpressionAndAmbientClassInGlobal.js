//// [collisionThisExpressionAndAmbientClassInGlobal.ts]
declare class _this { // no error - as no code generation
}
var f = () => this;
var a = new _this(); // Error

//// [collisionThisExpressionAndAmbientClassInGlobal.js]
var _this_1 = this;
var f = function () { return _this_1; };
var a = new _this(); // Error
