//// [tests/cases/conformance/es6/templates/taggedTemplateWithConstructableTag02.ts] ////

//// [taggedTemplateWithConstructableTag02.ts]
interface I {
    new (...args: any[]): string;
    new (): number;
}
var tag: I;
tag `Hello world!`;

//// [taggedTemplateWithConstructableTag02.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var tag;
tag(__makeTemplateObject(["Hello world!"], ["Hello world!"]));
