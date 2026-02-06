//// [tests/cases/compiler/arrowFunctionWithObjectLiteralBody1.ts] ////

//// [arrowFunctionWithObjectLiteralBody1.ts]
var v = a => <any>{}

//// [arrowFunctionWithObjectLiteralBody1.js]
"use strict";
var v = a => ({});
