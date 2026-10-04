//// [tests/cases/compiler/castFunctionExpressionShouldBeParenthesized.ts] ////

//// [castFunctionExpressionShouldBeParenthesized.ts]
(function a() { } as any)().foo()

//// [castFunctionExpressionShouldBeParenthesized.js]
"use strict";
(function a() { }().foo());
