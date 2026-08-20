//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression20_es6.ts] ////

//// [YieldExpression20_es6.ts]
function* test() {
  return () => ({
    b: yield 2, // error
  });
}


//// [YieldExpression20_es6.js]
"use strict";
function* test() {
    return () => ({
        b: yield 2, // error
    });
}
