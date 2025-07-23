// @strict: true
// @noUnusedLocals: true
// @noEmit: true

// @filename: /a.ts
export interface A {}

// @filename: /b.ts
import type { A } from "./a";

export enum Enum {
  /**
   * {@link A}
   */
  EnumValue,
}
