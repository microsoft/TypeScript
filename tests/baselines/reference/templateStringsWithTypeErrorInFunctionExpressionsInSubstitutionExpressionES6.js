//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.ts]
`${function (x: number) { x = "bad"; } }`;

//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.js]
`${function (x) { x = "bad"; }}`;
