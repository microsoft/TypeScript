//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression14_es6.ts] ////

//// [YieldExpression14_es6.ts]
class C {
  foo() {
     yield foo
  }
}

//// [YieldExpression14_es6.js]
class C {
    foo() {
        yield foo;
    }
}
