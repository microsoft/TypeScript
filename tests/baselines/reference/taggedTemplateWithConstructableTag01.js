//// [tests/cases/conformance/es6/templates/taggedTemplateWithConstructableTag01.ts] ////

//// [taggedTemplateWithConstructableTag01.ts]
class CtorTag { }

CtorTag `Hello world!`;

//// [taggedTemplateWithConstructableTag01.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var CtorTag = /** @class */ (function () {
    function CtorTag() {
    }
    return CtorTag;
}());
CtorTag(__makeTemplateObject(["Hello world!"], ["Hello world!"]));
