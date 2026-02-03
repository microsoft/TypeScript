//// [tests/cases/compiler/taggedTemplateStringsHexadecimalEscapes.ts] ////

//// [taggedTemplateStringsHexadecimalEscapes.ts]
function f(...args: any[]) {
}

f `\x0D${ "Interrupted CRLF" }\x0A`;

//// [taggedTemplateStringsHexadecimalEscapes.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function f() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
f(__makeTemplateObject(["\r", "\n"], ["\\x0D", "\\x0A"]), "Interrupted CRLF");
