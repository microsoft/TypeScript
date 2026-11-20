// @module: commonjs
// @target: es2015
// @checkOrder: default,editorfirst
// @filename: /a.ts
export interface A {}

// @filename: /b.ts
import * as a from "./a";

/**
 * See {@link a.A}.
 */
export function foo() {}
