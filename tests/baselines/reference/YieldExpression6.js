//// [YieldExpression6.ts]
function* foo() {
  yield*foo
}

//// [YieldExpression6.js]
function foo() {
    ;
}
