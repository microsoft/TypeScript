//// [taggedTemplateStringsWithUnicodeEscapes.ts]
function f(...args: any[]) {
}

f `'\u{1f4a9}'${ " should be converted to " }'\uD83D\uDCA9'`;

//// [taggedTemplateStringsWithUnicodeEscapes.js]
var __getTemplateObject = (this && this.__getTemplateObject) || function (cooked, raw) {
    if (Object.freeze && Object.defineProperty) {
        return Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    cooked.raw = raw;
    return cooked;
};
function f() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
f(_a || (_a = __getTemplateObject(["'\uD83D\uDCA9'", "'\uD83D\uDCA9'"], ["'\\u{1f4a9}'", "'\\uD83D\\uDCA9'"])), " should be converted to ");
var _a;
