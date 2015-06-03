//// [typeCheckReturnExpressionMethodBody.ts]
var foo = { bar() { return undefined } };

//// [typeCheckReturnExpressionMethodBody.js]
var foo = { bar: function () { return undefined; } };
