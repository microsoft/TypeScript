//// [tests/cases/conformance/es6/templates/taggedTemplateStringsWithTagNamedDeclare.ts] ////

//// [taggedTemplateStringsWithTagNamedDeclare.ts]
function declare(x: any, ...ys: any[]) {
}

declare `Hello ${0} world!`;

//// [taggedTemplateStringsWithTagNamedDeclare.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function declare(x) {
    var ys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ys[_i - 1] = arguments[_i];
    }
}
declare(__makeTemplateObject(["Hello ", " world!"], ["Hello ", " world!"]), 0);
