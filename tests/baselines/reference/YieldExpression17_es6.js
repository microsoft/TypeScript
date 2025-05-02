//// [tests/cases/conformance/es6/yieldExpressions/YieldExpression17_es6.ts] ////

//// [YieldExpression17_es6.ts]
var v = { get foo() { yield foo; } }

//// [YieldExpression17_es6.js]
var v = { get foo() { yield foo; } };
