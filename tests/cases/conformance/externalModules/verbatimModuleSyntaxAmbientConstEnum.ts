// @verbatimModuleSyntax: true
// @target: esnext
// @module: preserve
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: /node_modules/pkg/index.d.ts
export declare const enum E { A, B, C }

// @Filename: /app.ts
import { E } from "pkg"; // Error
console.log(E.A); // Ok
