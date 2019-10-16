//// [templateStringInPropertyName1.ts]
var x = {
    `a`: 321
}

//// [templateStringInPropertyName1.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var x = {}(templateObject_177670_1 || (templateObject_177670_1 = __makeTemplateObject(["a"], ["a"])));
321;
var templateObject_177670_1;
