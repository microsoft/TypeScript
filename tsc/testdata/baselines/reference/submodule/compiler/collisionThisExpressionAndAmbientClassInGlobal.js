//// [tests/cases/compiler/collisionThisExpressionAndAmbientClassInGlobal.ts] ////

//// [collisionThisExpressionAndAmbientClassInGlobal.ts]
declare class _this { // no error - as no code generation
}
var f = () => this;
var a = new _this(); // Error

//// [collisionThisExpressionAndAmbientClassInGlobal.js]
var f = () => this;
var a = new _this();
