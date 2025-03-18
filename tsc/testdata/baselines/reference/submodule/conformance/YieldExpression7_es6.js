//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression7_es6.ts] ////

//// [YieldExpression7_es6.ts]
function* foo() {
  yield foo
}

//// [YieldExpression7_es6.js]
function* foo() {
    yield foo;
}
