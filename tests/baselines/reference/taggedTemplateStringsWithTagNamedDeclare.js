//// [taggedTemplateStringsWithTagNamedDeclare.ts]
function declare(x: any, ...ys: any[]) {
}

declare `Hello ${0} world!`;

//// [taggedTemplateStringsWithTagNamedDeclare.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.freeze && Object.defineProperty) {
        return Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    cooked.raw = raw;
    return cooked;
};
function declare(x) {
    var ys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ys[_i - 1] = arguments[_i];
    }
}
declare(_a || (_a = __getTemplateObject(["Hello ", " world!"], ["Hello ", " world!"])), 0);
var _a;
