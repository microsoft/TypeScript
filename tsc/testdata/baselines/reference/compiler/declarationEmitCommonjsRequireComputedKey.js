//// [tests/cases/compiler/declarationEmitCommonjsRequireComputedKey.ts] ////

//// [a.js]
exports.value = 123;
exports.text = "text";
exports.other = true;
exports.nested = { value: 1 };
class Obj {
    x = 1;
}
exports.Obj = Obj;

//// [b.js]
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




//// [a.d.ts]
export declare var value: 123;
export declare var text: "text";
export declare var other: true;
export declare var nested: {
    value: number;
};
export { Obj };
declare class Obj {
    x: number;
}
//// [b.d.ts]
export { dynamic };
export { text };
export { other };
export { value };
export { rest };
export { sibling };
export { Obj };
export { extra };
export { useObj };
export { keep };
import sibling = require("./a");
import { text as text, other } from "./a";
declare const dynamic: any, value: number, rest: any;
import { Obj } from "./a";
declare const extra: any;
/** @param {Obj} o */
declare function useObj(o: Obj): void;
declare const keep = 1;
