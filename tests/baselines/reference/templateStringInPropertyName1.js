//// [tests/cases/conformance/es6/templates/templateStringInPropertyName1.ts] ////

//// [templateStringInPropertyName1.ts]
var x = {
    `a`: 321
}

//// [templateStringInPropertyName1.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.freeze) {
        Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
var x = {}(__makeTemplateObject(["a"], ["a"]));
321;
