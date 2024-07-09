//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression16_es6.ts] ////

//// [YieldExpression16_es6.ts]
function* foo() {
  function bar() {
    yield foo;
  }
}

//// [YieldExpression16_es6.js]
function* foo() {
    function bar() {
        yield foo;
    }
}
