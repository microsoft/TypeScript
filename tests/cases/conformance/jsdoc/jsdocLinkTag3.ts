// @module: commonjs
// @target: es2015
// @noUnusedLocals: true
// @filename: /a.ts
export interface A {}

// @filename: /b.ts
import type { A } from "./a";

/**
 * @param {number} a - see {@link A}
 */
export function foo(a: string) {}
