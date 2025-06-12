//// [tests/cases/compiler/collisionThisExpressionAndAmbientVarInGlobal.ts] ////

//// [collisionThisExpressionAndAmbientVarInGlobal.ts]
declare var _this: number; // no error as no code gen
var f = () => this;
_this = 10; // Error

//// [collisionThisExpressionAndAmbientVarInGlobal.js]
var f = () => this;
_this = 10; // Error
