//// [tests/cases/conformance/jsdoc/jsdocLinkTag4.ts] ////

//// [a.ts]
export interface A {}

//// [b.ts]
import * as a from "./a";

/**
 * @param {number} a - see {@link a.A}
 */
export function foo(a: string) {}


//// [a.js]
export {};
//// [b.js]
/**
 * @param {number} a - see {@link a.A}
 */
export function foo(a) { }
