//// [taggedTemplateStringsHexadecimalEscapes.ts]
function f(...args: any[]) {
}

f `\x0D${ "Interrupted CRLF" }\x0A`;

//// [taggedTemplateStringsHexadecimalEscapes.js]
function f() {
}
(_a = ["\r", "\n"], _a.raw = ["\\x0D", "\\x0A"], f(_a, "Interrupted CRLF"));
var _a;
