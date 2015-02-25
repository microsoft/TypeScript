//// [taggedTemplateStringsWithUnicodeEscapes.ts]
function f(...args: any[]) {
}

f `'\u{1f4a9}'${ " should be converted to " }'\uD83D\uDCA9'`;

//// [taggedTemplateStringsWithUnicodeEscapes.js]
function f() {
}
(_a = ["'{1f4a\u0039}'", "'💩'"], _a.raw = ["'\\u{1f4a\u0039}'", "'\\uD83D\\uDCA\u0039'"], f(_a, " should be converted to "));
var _a;
