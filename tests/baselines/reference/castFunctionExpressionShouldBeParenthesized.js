//// [tests/cases/compiler/castFunctionExpressionShouldBeParenthesized.ts] ////

//// [castFunctionExpressionShouldBeParenthesized.ts]
(function a() { } as any)().foo()

//// [castFunctionExpressionShouldBeParenthesized.js]
(function a() { }().foo());
