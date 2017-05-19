//// [YieldExpression6_es6.ts]
function* foo() {
  yield*foo
}

//// [YieldExpression6_es6.js]
function* foo() {
    yield* foo;
}
