//// [tests/cases/conformance/es6/templates/templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.ts] ////

//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.ts]
`${function (x: number) { x = "bad"; } }`;

//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.js]
`${function (x) { x = "bad"; }}`;
