// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: out

// @filename: a.js
exports[0] = 123;
exports["a b"] = "text";
exports.named = true;
exports[1] = { value: 1 };
exports["-0"] = "negative zero";

// @filename: b.js
const {0: numeric, "a b": text, named} = require("./a");
const {[1]: computedNumeric, [`a b`]: computedTemplate} = require("./a");
exports.numeric = numeric;
exports.text = text;
exports.named = named;
exports.computedNumeric = computedNumeric;
exports.computedTemplate = computedTemplate;

const {[-0]: signedZero, ["-0"]: negativeZeroString} = require("./a");
exports.signedZero = signedZero;
exports.negativeZeroString = negativeZeroString;
