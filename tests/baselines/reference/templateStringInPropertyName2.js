//// [tests/cases/conformance/es6/templates/templateStringInPropertyName2.ts] ////

//// [templateStringInPropertyName2.ts]
var x = {
    `abc${ 123 }def${ 456 }ghi`: 321
}

//// [templateStringInPropertyName2.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var x = {}(__makeTemplateObject(["abc", "def", "ghi"], ["abc", "def", "ghi"]), 123, 456);
321;
