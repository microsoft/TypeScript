//// [tests/cases/compiler/declarationEmitCommonjsRequireNumericKey.ts] ////

//// [a.js]
exports[0] = 123;
exports["a b"] = "text";
exports.named = true;
exports[1] = { value: 1 };
exports["-0"] = "negative zero";

//// [b.js]
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




//// [a.d.ts]
declare const _exported: 123;
export { _exported as "0" };
declare const _exported_1: "text";
export { _exported_1 as "a b" };
export declare var named: true;
declare const _exported_2: {
    value: number;
};
export { _exported_2 as "1" };
declare const _exported_3: "negative zero";
export { _exported_3 as "-0" };
//// [b.d.ts]
export { numeric };
export { text };
export { named };
export { computedNumeric };
export { computedTemplate };
export { signedZero };
export { negativeZeroString };
import { "0" as numeric, "a b" as text, named } from "./a";
import { "1" as computedNumeric, "a b" as computedTemplate } from "./a";
import { "0" as signedZero, "-0" as negativeZeroString } from "./a";
