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
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
/**
 * @param {number} a - see {@link A}
 */
function foo(a) { }
