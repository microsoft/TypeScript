//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts]
`${function (x: number) { x = "bad"; } }`;

//// [templateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.js]
"" + function (x) { x = "bad"; };
