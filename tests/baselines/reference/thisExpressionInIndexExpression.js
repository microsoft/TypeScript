//// [tests/cases/compiler/thisExpressionInIndexExpression.ts] ////

//// [thisExpressionInIndexExpression.ts]
function f() {
    return r => r[this];
}

//// [thisExpressionInIndexExpression.js]
function f() {
    var _this = this;
    return function (r) { return r[_this]; };
}
