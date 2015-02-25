//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts]


function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.js]
function foo() {
}
(_a = ["", ""], _a.raw = ["", ""], foo(_a, function (x) { x = "bad"; }));
var _a;
