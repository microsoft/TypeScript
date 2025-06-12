//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts] ////

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts]
function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.js]
function foo(...rest) {
}
foo `${function (x) { x = "bad"; }}`;
