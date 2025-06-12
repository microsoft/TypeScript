//// [tests/cases/compiler/thisExpressionInIndexExpression.ts] ////

//// [thisExpressionInIndexExpression.ts]
function f() {
    return r => r[this];
}

//// [thisExpressionInIndexExpression.js]
function f() {
    return r => r[this];
}
