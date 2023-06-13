//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts] ////

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts]
function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}
foo(__makeTemplateObject(["", ""], ["", ""]), function (x) { x = "bad"; });
