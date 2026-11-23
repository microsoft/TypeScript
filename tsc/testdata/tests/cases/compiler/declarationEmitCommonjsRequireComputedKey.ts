// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: out

// @filename: a.js
exports.value = 123;
exports.text = "text";
exports.other = true;
exports.nested = { value: 1 };
class Obj {
    x = 1;
}
exports.Obj = Obj;

// @filename: b.js
const key = "value";
const {[key]: dynamic, ["text"]: text, other, nested: {value}, ...rest} = require("./a"),
    sibling = require("./a");
exports.dynamic = dynamic;
exports.text = text;
exports.other = other;
exports.value = value;
exports.rest = rest;
exports.sibling = sibling;

const {[key]: extra, Obj} = require("./a");
/** @param {Obj} o */
function useObj(o) {}
exports.Obj = Obj;
exports.extra = extra;
exports.useObj = useObj;

const {[key]: unusedDynamic, text: unusedText} = require("./a"), keep = 1;
exports.keep = keep;
