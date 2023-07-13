//// [tests/cases/conformance/es6/templates/templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts] ////

//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts]
`${function (x: number) { x = "bad"; } }`;

//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.js]
"".concat(function (x) { x = "bad"; });
