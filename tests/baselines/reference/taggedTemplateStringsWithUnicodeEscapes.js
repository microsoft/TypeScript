//// [taggedTemplateStringsWithUnicodeEscapes.ts]
function f(...args: any[]) {
}

f `'\u{1f4a9}'${ " should be converted to " }'\uD83D\uDCA9'`;

//// [taggedTemplateStringsWithUnicodeEscapes.js]
function f() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
(_a = ["'\uD83D\uDCA9'", "'\uD83D\uDCA9'"], _a.raw = ["'\\u{1f4a9}'", "'\\uD83D\\uDCA9'"], f(_a, " should be converted to "));
var _a;
