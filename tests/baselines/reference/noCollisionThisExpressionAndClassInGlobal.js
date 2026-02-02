//// [tests/cases/compiler/noCollisionThisExpressionAndClassInGlobal.ts] ////

//// [noCollisionThisExpressionAndClassInGlobal.ts]
class _this {
}
var f = () => _this;

//// [noCollisionThisExpressionAndClassInGlobal.js]
class _this {
}
var f = () => _this;
