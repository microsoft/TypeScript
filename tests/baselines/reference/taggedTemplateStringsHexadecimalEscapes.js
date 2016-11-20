//// [taggedTemplateStringsHexadecimalEscapes.ts]
function f(...args: any[]) {
}

f `\x0D${ "Interrupted CRLF" }\x0A`;

//// [taggedTemplateStringsHexadecimalEscapes.js]
function f() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
(_a = ["\r", "\n"], _a.raw = ["\\x0D", "\\x0A"], f(_a, "Interrupted CRLF"));
var _a;
