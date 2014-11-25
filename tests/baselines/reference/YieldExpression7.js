//// [YieldExpression7.ts]
function* foo() {
  yield foo
}

//// [YieldExpression7.js]
function foo() {
    ;
}
