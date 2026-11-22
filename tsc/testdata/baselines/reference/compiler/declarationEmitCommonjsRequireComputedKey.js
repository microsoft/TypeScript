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
exports.b = { c: "hello" };
exports.arr = [1];
exports.a = "a";

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

// Case 1: Nested object destructuring
const { b: { c } } = require("./a");
exports.c = c;

// Case 2: Nested array destructuring
const { arr: [first] } = require("./a");
exports.first = first;

// Case 3: Mixed destructuring
const { a, b: { c: c2 } } = require("./a");
exports.a = a;
exports.c2 = c2;




//// [a.d.ts]
export declare var value: 123;
export declare var text: "text";
export declare var other: true;
export declare var nested: {
    value: number;
};
export { Obj };
export declare var b: {
    c: string;
};
export declare var arr: number[];
export declare var a: "a";
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
export { c };
export { first };
export { a };
export { c2 };
import sibling = require("./a");
import { text as text, other } from "./a";
declare const dynamic: any, value: number, rest: any;
import { Obj } from "./a";
declare const extra: any;
/** @param {Obj} o */
declare function useObj(o: Obj): void;
declare const keep = 1;
declare const c: string;
declare const first: number;
import { a } from "./a";
declare const c2: string;
