//// [tests/cases/conformance/es6/templates/taggedTemplateUntypedTagCall01.ts] ////

//// [taggedTemplateUntypedTagCall01.ts]
var tag: Function;
tag `Hello world!`;

//// [taggedTemplateUntypedTagCall01.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var tag;
tag(__makeTemplateObject(["Hello world!"], ["Hello world!"]));
