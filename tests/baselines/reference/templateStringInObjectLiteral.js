//// [templateStringInObjectLiteral.ts]
var x = {
    a: `abc${ 123 }def`,
    `b`: 321
}

//// [templateStringInObjectLiteral.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        return Object.defineProperty(cooked, "raw", { value: raw });
    }
    cooked.raw = raw;
    return cooked;
};
var x = {
    a: "abc" + 123 + "def"
}(_a || (_a = __getTemplateObject(["b"], ["b"])));
321;
var _a;
