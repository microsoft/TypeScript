//// [tests/cases/conformance/es6/yieldExpressions/YieldStarExpression3_es6.ts] ////

//// [YieldStarExpression3_es6.ts]
function *g() {
    yield *;
}

//// [YieldStarExpression3_es6.js]
function* g() {
    yield* ;
}
