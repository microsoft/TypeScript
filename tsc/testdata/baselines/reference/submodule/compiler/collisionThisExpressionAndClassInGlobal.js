//// [tests/cases/compiler/collisionThisExpressionAndClassInGlobal.ts] ////

//// [collisionThisExpressionAndClassInGlobal.ts]
class _this {
}
var f = () => this;

//// [collisionThisExpressionAndClassInGlobal.js]
class _this {
}
var f = () => this;
