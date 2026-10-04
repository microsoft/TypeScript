//// [tests/cases/compiler/typeCheckObjectLiteralMethodBody.ts] ////

//// [typeCheckObjectLiteralMethodBody.ts]
var foo = { bar() { return undefined } };

//// [typeCheckObjectLiteralMethodBody.js]
"use strict";
var foo = { bar() { return undefined; } };
