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
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
/**
 * @param {number} a - see {@link A}
 */
function foo(a) { }
exports.foo = foo;
