//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression5_es6.ts] ////

//// [YieldExpression5_es6.ts]
function* foo() {
  yield*
}

//// [YieldExpression5_es6.js]
function* foo() {
    yield* ;
}
