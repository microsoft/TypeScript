//// [taggedTemplateUntypedTagCall01.ts]
var tag: Function;
tag `Hello world!`;

//// [taggedTemplateUntypedTagCall01.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
var tag;
tag(__makeTemplateObject(["Hello world!"], ["Hello world!"]));
