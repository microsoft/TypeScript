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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
/**
 * @param {number} a - see {@link a.A}
 */
function foo(a) { }
