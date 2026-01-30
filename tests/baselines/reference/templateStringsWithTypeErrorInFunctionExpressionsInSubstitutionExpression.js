//// [tests/cases/conformance/es6/templates/templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts] ////

//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts]
`${function (x: number) { x = "bad"; } }`;

//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.js]
"use strict";
"".concat(function (x) { x = "bad"; });
