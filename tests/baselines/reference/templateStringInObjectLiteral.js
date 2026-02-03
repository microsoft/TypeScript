//// [tests/cases/conformance/es6/templates/templateStringInObjectLiteral.ts] ////

//// [templateStringInObjectLiteral.ts]
var x = {
    a: `abc${ 123 }def`,
    `b`: 321
}

//// [templateStringInObjectLiteral.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var x = {
    a: "abc".concat(123, "def"),
}(__makeTemplateObject(["b"], ["b"]));
321;
