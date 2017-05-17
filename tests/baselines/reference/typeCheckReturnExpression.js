//// [typeCheckReturnExpression.ts]
var foo = () => undefined;

//// [typeCheckReturnExpression.js]
var foo = function foo() { return undefined; };
