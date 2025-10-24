//// [tests/cases/conformance/salsa/typeTagOnFunctionReferencesGeneric.ts] ////

//// [typeTagOnFunctionReferencesGeneric.js]
/**
 * @typedef {<T>(m : T) => T} IFn
 */

/**@type {IFn}*/
export function inJs(l) {
    return l;
}
inJs(1); // lints error. Why?

/**@type {IFn}*/
const inJsArrow = (j) => {
    return j;
}
inJsArrow(2); // no error gets linted as expected


//// [typeTagOnFunctionReferencesGeneric.js]
"use strict";
/**
 * @typedef {<T>(m : T) => T} IFn
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inJs = inJs;
/**@type {IFn}*/
function inJs(l) {
    return l;
}
inJs(1); // lints error. Why?
/**@type {IFn}*/
const inJsArrow = (j) => {
    return j;
};
inJsArrow(2); // no error gets linted as expected


//// [typeTagOnFunctionReferencesGeneric.d.ts]
/**
 * @typedef {<T>(m : T) => T} IFn
 */
export type IFn = <T>(m: T) => T;
/**@type {IFn}*/
export declare function inJs<T>(l: T): T;
