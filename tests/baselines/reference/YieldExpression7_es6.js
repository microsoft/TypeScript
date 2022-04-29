//// [YieldExpression7_es6.ts]
function* foo() {
  yield foo
}

//// [YieldExpression7_es6.js]
function* foo() {
    yield foo;
}
