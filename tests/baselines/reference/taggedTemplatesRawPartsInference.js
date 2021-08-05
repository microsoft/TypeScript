//// [taggedTemplatesRawPartsInference.ts]
function tag<TParts extends readonly string[], TRaw extends readonly string[], U extends readonly unknown[]>(strs: TemplateStringsArray<TParts, TRaw>, ...args: U): {parts: TParts; raw: TRaw; args: U} {
    return null;
}

var a = tag `part\1${''}part\2`;
var a: {};


//// [taggedTemplatesRawPartsInference.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function tag(strs) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return null;
}
var a = tag(__makeTemplateObject(["part1", "part2"], ["part\\1", "part\\2"]), '');
var a;
