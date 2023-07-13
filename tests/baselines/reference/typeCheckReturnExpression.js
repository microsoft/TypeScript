//// [tests/cases/compiler/typeCheckReturnExpression.ts] ////

//// [typeCheckReturnExpression.ts]
var foo = () => undefined;

//// [typeCheckReturnExpression.js]
var foo = function () { return undefined; };
