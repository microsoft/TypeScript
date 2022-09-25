// @noUnusedLocals: true
// @filename: /a.ts
export interface A {}

// @filename: /b.ts
import * as a from "./a";

/**
 * @param {number} a - see {@link a.A}
 */
export function foo(a: string) {}
