//// [tests/cases/conformance/es6/templates/templateStringInModuleName.ts] ////

//// [templateStringInModuleName.ts]
declare module `M1` {
}

declare module `M${2}` {
}

//// [templateStringInModuleName.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.freeze) {
        Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
declare;
module(__makeTemplateObject(["M1"], ["M1"]));
{
}
declare;
module(__makeTemplateObject(["M", ""], ["M", ""]), 2);
{
}
