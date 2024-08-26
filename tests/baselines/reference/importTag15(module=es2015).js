//// [tests/cases/conformance/jsdoc/importTag15.ts] ////

//// [0.ts]
export interface I { }

//// [1.js]
/** @import { I } from './0' with { type: "json" } */
/** @import * as foo from './0' with { type: "json" } */

/** @param {I} a */
function f(a) {}




//// [0.d.ts]
export interface I {
}
//// [1.d.ts]
/** @import { I } from './0' with { type: "json" } */
/** @import * as foo from './0' with { type: "json" } */
/** @param {I} a */
declare function f(a: I): void;
import type { I } from './0' with { type: "json" };
import type * as foo from './0';
