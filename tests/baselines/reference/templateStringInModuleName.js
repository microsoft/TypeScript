//// [templateStringInModuleName.ts]
declare module `M1` {
}

declare module `M${2}` {
}

//// [templateStringInModuleName.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
declare;
module(_a || (_a = __makeTemplateObject(["M1"], ["M1"])));
{
}
declare;
module(_b || (_b = __makeTemplateObject(["M", ""], ["M", ""])), 2);
{
}
var _a, _b;
