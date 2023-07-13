//// [tests/cases/compiler/taggedTemplateStringsWithUnicodeEscapesES6.ts] ////

//// [taggedTemplateStringsWithUnicodeEscapesES6.ts]
function f(...args: any[]) {
}

f `'\u{1f4a9}'${ " should be converted to " }'\uD83D\uDCA9'`;

//// [taggedTemplateStringsWithUnicodeEscapesES6.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function f(...args) {
}
f(__makeTemplateObject(["'\uD83D\uDCA9'", "'\uD83D\uDCA9'"], ["'\\u{1f4a9}'", "'\\uD83D\\uDCA9'"]), " should be converted to ");
