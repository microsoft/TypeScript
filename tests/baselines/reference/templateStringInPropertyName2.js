//// [templateStringInPropertyName2.ts]
var x = {
    `abc${ 123 }def${ 456 }ghi`: 321
}

//// [templateStringInPropertyName2.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var x = {}(templateObject_6321411194_1 || (templateObject_6321411194_1 = __makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"])), 123, 456);
321;
var templateObject_6321411194_1;
