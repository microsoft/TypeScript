//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression8_es6.ts] ////

//// [YieldExpression8_es6.ts]
yield(foo);
function* foo() {
  yield(foo);
}

//// [YieldExpression8_es6.js]
yield(foo);
function* foo() {
    yield (foo);
}
