// @verbatimModuleSyntax: true
// @target: esnext
// @module: preserve
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /node_modules/pkg/index.d.ts
export declare const enum E { A, B, C }
declare global {
  const enum F { A, B, C }
}

// @Filename: /a.ts
import { E } from "pkg"; // Error
import type { E as _E } from "pkg"; // Ok
console.log(E.A); // Ok
F.A; // Error

// @Filename: /b.ts
export { E } from "pkg"; // Error
export type { E as _E } from "pkg"; // Ok
