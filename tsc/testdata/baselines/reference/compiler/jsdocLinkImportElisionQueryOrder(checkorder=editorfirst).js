//// [tests/cases/compiler/jsdocLinkImportElisionQueryOrder.ts] ////

//// [a.ts]
export interface A {}

//// [b.ts]
import * as a from "./a";

/**
 * See {@link a.A}.
 */
export function foo() {}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
/**
 * See {@link a.A}.
 */
function foo() { }
