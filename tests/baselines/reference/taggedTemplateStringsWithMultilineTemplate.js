//// [taggedTemplateStringsWithMultilineTemplate.ts]
function f(...args: any[]): void {
}

f `
\

`;

//// [taggedTemplateStringsWithMultilineTemplate.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.freeze && Object.defineProperty) {
        return Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    cooked.raw = raw;
    return cooked;
};
function f() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
f(_a || (_a = __getTemplateObject(["\n\n"], ["\n\\\n\n"])));
var _a;
