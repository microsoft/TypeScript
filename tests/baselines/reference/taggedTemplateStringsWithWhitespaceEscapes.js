//// [taggedTemplateStringsWithWhitespaceEscapes.ts]
function f(...args: any[]) {
}

f `\t\n\v\f\r\\`;

//// [taggedTemplateStringsWithWhitespaceEscapes.js]
function f() {
}
(_a = ["\t\n\v\f\r\\"], _a.raw = ["\\t\\n\\v\\f\\r\\\\"], f(_a));
var _a;
