//// [taggedTemplateStringsWithWhitespaceEscapes.ts]
function f(...args: any[]) {
}

f `\t\n\v\f\r\\`;

//// [taggedTemplateStringsWithWhitespaceEscapes.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function f() {
}
f(__makeTemplateObject(["\t\n\v\f\r\\"], ["\\t\\n\\v\\f\\r\\\\"]));
