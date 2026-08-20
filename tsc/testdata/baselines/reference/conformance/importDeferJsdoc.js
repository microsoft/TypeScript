//// [tests/cases/conformance/jsdoc/importDeferJsdoc.ts] ////

//// [types.ts]
export type X = 1;

//// [foo.js]
/**
 * @import defer * as ns from "./types"
 */

/**
 * @type { ns.X }
 */
let a = 2;




//// [types.d.ts]
export type X = 1;
//// [foo.d.ts]
/**
 * @import defer * as ns from "./types"
 */
/**
 * @type { ns.X }
 */
declare let a: ns.X;
