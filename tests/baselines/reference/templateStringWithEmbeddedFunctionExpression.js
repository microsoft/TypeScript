//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedFunctionExpression.ts] ////

//// [templateStringWithEmbeddedFunctionExpression.ts]
var x = `abc${ function y() { return y; } }def`;

//// [templateStringWithEmbeddedFunctionExpression.js]
"use strict";
var x = `abc${function y() { return y; }}def`;
