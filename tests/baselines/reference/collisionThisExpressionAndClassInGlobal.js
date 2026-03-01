//// [tests/cases/compiler/collisionThisExpressionAndClassInGlobal.ts] ////

//// [collisionThisExpressionAndClassInGlobal.ts]
class _this {
}
var f = () => this;

//// [collisionThisExpressionAndClassInGlobal.js]
"use strict";
class _this {
}
var f = () => this;
