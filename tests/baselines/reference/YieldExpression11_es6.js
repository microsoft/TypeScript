//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression11_es6.ts] ////

//// [YieldExpression11_es6.ts]
class C {
  *foo() {
    yield(foo);
  }
}

//// [YieldExpression11_es6.js]
class C {
    *foo() {
        yield (foo);
    }
}
