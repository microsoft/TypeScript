// @noUnusedLocals: true
// @filename: /a.ts
export interface A {}

// @filename: /b.ts
import type { A } from "./a";

/** {@link A} */
export interface B {}
