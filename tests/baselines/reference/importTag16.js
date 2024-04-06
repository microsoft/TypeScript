//// [tests/cases/conformance/jsdoc/importTag16.ts] ////

//// [a.ts]
export default interface Foo {}
export interface I {}

//// [b.js]
/** @import Foo, { I } from "./a" */

/**
 * @param {Foo} a
 * @param {I} b
 */
export function foo(a, b) {}




//// [a.d.ts]
export default interface Foo {
}
export interface I {
}
//// [b.d.ts]
/** @import Foo, { I } from "./a" */
/**
 * @param {Foo} a
 * @param {I} b
 */
export function foo(a: Foo, b: I): void;
import type Foo from "./a";
import type { I } from "./a";
