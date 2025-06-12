//// [tests/cases/compiler/collisionThisExpressionAndFunctionInGlobal.ts] ////

//// [collisionThisExpressionAndFunctionInGlobal.ts]
function _this() { //Error
    return 10;
}
var f = () => this;

//// [collisionThisExpressionAndFunctionInGlobal.js]
function _this() {
    return 10;
}
var f = () => this;
