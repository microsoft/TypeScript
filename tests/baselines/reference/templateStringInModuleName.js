//// [templateStringInModuleName.ts]
declare module `M1` {
}

declare module `M${2}` {
}

//// [templateStringInModuleName.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
declare;
module(templateObject_5862499_1 || (templateObject_5862499_1 = __makeTemplateObject(["M1"], ["M1"])));
{
}
declare;
module(templateObject_2089378918_1 || (templateObject_2089378918_1 = __makeTemplateObject(["M", ""], ["M", ""])), 2);
{
}
var templateObject_5862499_1, templateObject_2089378918_1;
