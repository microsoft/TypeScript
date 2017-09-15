//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.ts]
function foo(...rest: any[]) {
}

foo `${function (x: number) { x = "bad"; } }`;

//// [taggedTemplateStringsWithTypeErrorInFunctionExpressionsInSubstitutionExpression.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}
foo(_a || (_a = __getTemplateObject(["", ""], ["", ""])), function (x) { x = "bad"; });
var _a;
