/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /a.ts
////export function f() {}

// @filename: /b.ts
////import { f } from "./a";
////export interface I {}
////type f = number;
////export { f };

// @filename: /c.ts
////import { I, f } from "./b";
////export { type I, f };

goTo.file("/c.ts");
verify.codeFixAvailable([
    { description: "Use 'type I'" },
]);
