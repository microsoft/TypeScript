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
exports.__esModule = true;
exports.inJs = void 0;
/**@type {IFn}*/
function inJs(l) {
    return l;
}
exports.inJs = inJs;
inJs(1); // lints error. Why?
/**@type {IFn}*/
var inJsArrow = function (j) {
    return j;
};
inJsArrow(2); // no error gets linted as expected


//// [typeTagOnFunctionReferencesGeneric.d.ts]
/**
 * @typedef {<T>(m : T) => T} IFn
 */
/**@type {IFn}*/
export function inJs<T>(l: T): T;
export type IFn = <T>(m: T) => T;
