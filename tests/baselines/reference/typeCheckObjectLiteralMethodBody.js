//// [tests/cases/compiler/typeCheckObjectLiteralMethodBody.ts] ////

//// [typeCheckObjectLiteralMethodBody.ts]
var foo = { bar() { return undefined } };

//// [typeCheckObjectLiteralMethodBody.js]
var foo = { bar: function () { return undefined; } };
