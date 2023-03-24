//// [taggedTemplateStringsHexadecimalEscapesES6.ts]
function f(...args: any[]) {
}

f `\x0D${ "Interrupted CRLF" }\x0A`;

//// [taggedTemplateStringsHexadecimalEscapesES6.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function f(...args) {
}
f(__makeTemplateObject(["\r", "\n"], ["\\x0D", "\\x0A"]), "Interrupted CRLF");
