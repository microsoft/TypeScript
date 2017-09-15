//// [templateStringInPropertyName1.ts]
var x = {
    `a`: 321
}

//// [templateStringInPropertyName1.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
var x = {}(_a || (_a = __getTemplateObject(["a"], ["a"])));
321;
var _a;
