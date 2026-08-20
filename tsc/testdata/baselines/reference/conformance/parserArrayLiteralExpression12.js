//// [tests/cases/conformance/parser/ecmascript5/ArrayLiteralExpressions/parserArrayLiteralExpression12.ts] ////

//// [parserArrayLiteralExpression12.ts]
var v = [1,,,1];

//// [parserArrayLiteralExpression12.js]
"use strict";
var v = [1, , , 1];
