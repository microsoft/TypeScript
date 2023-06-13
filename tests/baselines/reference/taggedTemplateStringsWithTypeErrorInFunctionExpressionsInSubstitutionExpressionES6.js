//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.ts] ////

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.ts]
function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpressionES6.js]
function foo(...rest) {
}
foo `${function (x) { x = "bad"; }}`;
