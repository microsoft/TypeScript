//// [tests/cases/conformance/es2018/invalidTaggedTemplateEscapeSequences.ts] ////

//// [invalidTaggedTemplateEscapeSequences.ts]
function tag (str: any, ...args: any[]): any {
  return str
}

const a = tag`123`
const b = tag`123 ${100}`
const x = tag`\u{hello} ${ 100 } \xtraordinary ${ 200 } wonderful ${ 300 } \uworld`;
const y = `\u{hello} ${ 100 } \xtraordinary ${ 200 } wonderful ${ 300 } \uworld`; // should error with NoSubstitutionTemplate
const z = tag`\u{hello} \xtraordinary wonderful \uworld` // should work with Tagged NoSubstitutionTemplate

const a1 = tag`${ 100 }\0` // \0
const a2 = tag`${ 100 }\00` // \\00
const a3 = tag`${ 100 }\u` // \\u
const a4 = tag`${ 100 }\u0` // \\u0
const a5 = tag`${ 100 }\u00` // \\u00
const a6 = tag`${ 100 }\u000` // \\u000
const a7 = tag`${ 100 }\u0000` // \u0000
const a8 = tag`${ 100 }\u{` // \\u{
const a9 = tag`${ 100 }\u{10FFFF}` // \\u{10FFFF
const a10 = tag`${ 100 }\u{1f622` // \\u{1f622
const a11 = tag`${ 100 }\u{1f622}` // \u{1f622}
const a12 = tag`${ 100 }\x` // \\x
const a13 = tag`${ 100 }\x0` // \\x0
const a14 = tag`${ 100 }\x00` // \x00


//// [invalidTaggedTemplateEscapeSequences.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function tag(str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return str;
}
var a = tag(__makeTemplateObject(["123"], ["123"]));
var b = tag(__makeTemplateObject(["123 ", ""], ["123 ", ""]), 100);
var x = tag(__makeTemplateObject([void 0, void 0, " wonderful ", void 0], ["\\u{hello} ", " \\xtraordinary ", " wonderful ", " \\uworld"]), 100, 200, 300);
var y = "\\u{hello} ".concat(100, " \\xtraordinary ").concat(200, " wonderful ").concat(300, " \\uworld"); // should error with NoSubstitutionTemplate
var z = tag(__makeTemplateObject([void 0], ["\\u{hello} \\xtraordinary wonderful \\uworld"])); // should work with Tagged NoSubstitutionTemplate
var a1 = tag(__makeTemplateObject(["", "\0"], ["", "\\0"]), 100); // \0
var a2 = tag(__makeTemplateObject(["", void 0], ["", "\\00"]), 100); // \\00
var a3 = tag(__makeTemplateObject(["", void 0], ["", "\\u"]), 100); // \\u
var a4 = tag(__makeTemplateObject(["", void 0], ["", "\\u0"]), 100); // \\u0
var a5 = tag(__makeTemplateObject(["", void 0], ["", "\\u00"]), 100); // \\u00
var a6 = tag(__makeTemplateObject(["", void 0], ["", "\\u000"]), 100); // \\u000
var a7 = tag(__makeTemplateObject(["", "\0"], ["", "\\u0000"]), 100); // \u0000
var a8 = tag(__makeTemplateObject(["", void 0], ["", "\\u{"]), 100); // \\u{
var a9 = tag(__makeTemplateObject(["", "\uDBFF\uDFFF"], ["", "\\u{10FFFF}"]), 100); // \\u{10FFFF
var a10 = tag(__makeTemplateObject(["", void 0], ["", "\\u{1f622"]), 100); // \\u{1f622
var a11 = tag(__makeTemplateObject(["", "\uD83D\uDE22"], ["", "\\u{1f622}"]), 100); // \u{1f622}
var a12 = tag(__makeTemplateObject(["", void 0], ["", "\\x"]), 100); // \\x
var a13 = tag(__makeTemplateObject(["", void 0], ["", "\\x0"]), 100); // \\x0
var a14 = tag(__makeTemplateObject(["", "\0"], ["", "\\x00"]), 100); // \x00
