//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression6_es6.ts] ////

//// [YieldExpression6_es6.ts]
function* foo() {
  yield*foo
}

//// [YieldExpression6_es6.js]
"use strict";
function* foo() {
    yield* foo;
}
