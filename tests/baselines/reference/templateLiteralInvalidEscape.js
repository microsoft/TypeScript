//// [templateLiteralInvalidEscape.ts]
function raw(arr: TemplateStringsArray, ...args: unknown[]) {
  return arr.raw;
}

raw`\x`;
raw`\x0`;
raw`\u11`;
raw`\u{}`;
raw`\0123`;

`\x`;
`\x0`;
`\u11`;
`\u{}`;
`\0123`;

raw`${0}\x`;
raw`${0}\x0`;
raw`${0}\u11`;
raw`${0}\u{}`;
raw`${0}\0123`;

`${0}\x`;
`${0}\x0`;
`${0}\u11`;
`${0}\u{}`;
`${0}\0123`;


//// [templateLiteralInvalidEscape.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function raw(arr) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return arr.raw;
}
raw(__makeTemplateObject([void 0], ["\\x"]));
raw(__makeTemplateObject([void 0], ["\\x0"]));
raw(__makeTemplateObject([void 0], ["\\u11"]));
raw(__makeTemplateObject([void 0], ["\\u{}"]));
raw(__makeTemplateObject([void 0], ["\\0123"]));
"";
"";
"";
"";
"\x00123";
raw(__makeTemplateObject(["", void 0], ["", "\\x"]), 0);
raw(__makeTemplateObject(["", void 0], ["", "\\x0"]), 0);
raw(__makeTemplateObject(["", void 0], ["", "\\u11"]), 0);
raw(__makeTemplateObject(["", void 0], ["", "\\u{}"]), 0);
raw(__makeTemplateObject(["", void 0], ["", "\\0123"]), 0);
"" + 0;
"" + 0;
"" + 0;
"" + 0;
0 + "\x00123";
