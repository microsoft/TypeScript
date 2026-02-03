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
var inJsArrow = function (j) {
    return j;
};
inJsArrow(2); // no error gets linted as expected


//// [typeTagOnFunctionReferencesGeneric.d.ts]
export function inJs<T>(m: T): T;
export type IFn = <T>(m: T) => T;
