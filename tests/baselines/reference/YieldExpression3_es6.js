//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression3_es6.ts] ////

//// [YieldExpression3_es6.ts]
function* foo() {
  yield
  yield
}

//// [YieldExpression3_es6.js]
function* foo() {
    yield;
    yield;
}
