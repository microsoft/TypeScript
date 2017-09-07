//// [templateStringInModuleName.ts]
declare module `M1` {
}

declare module `M${2}` {
}

//// [templateStringInModuleName.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.freeze && Object.defineProperty) {
        return Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    cooked.raw = raw;
    return cooked;
};
declare;
module(_a || (_a = __getTemplateObject(["M1"], ["M1"])));
{
}
declare;
module(_b || (_b = __getTemplateObject(["M", ""], ["M", ""])), 2);
{
}
var _a, _b;
