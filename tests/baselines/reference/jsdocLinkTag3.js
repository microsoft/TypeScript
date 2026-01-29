//// [tests/cases/conformance/jsdoc/jsdocLinkTag3.ts] ////

//// [a.ts]
export interface A {}

//// [b.ts]
import type { A } from "./a";

/**
 * @param {number} a - see {@link A}
 */
export function foo(a: string) {}


//// [a.js]
export {};
//// [b.js]
/**
 * @param {number} a - see {@link A}
 */
export function foo(a) { }
