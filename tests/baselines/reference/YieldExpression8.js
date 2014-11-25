//// [YieldExpression8.ts]
yield(foo);
function* foo() {
  yield(foo);
}

//// [YieldExpression8.js]
yield(foo);
function foo() {
    ;
}
