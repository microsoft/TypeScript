//// [taggedTemplateWithConstructableTag02.ts]
interface I {
    new (...args: any[]): string;
    new (): number;
}
var tag: I;
tag `Hello world!`;

//// [taggedTemplateWithConstructableTag02.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.freeze && Object.defineProperty) {
        return Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    cooked.raw = raw;
    return cooked;
};
var tag;
tag(_a || (_a = __getTemplateObject(["Hello world!"], ["Hello world!"])));
var _a;
