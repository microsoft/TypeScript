/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /a.ts
////function f() {}
////export interface I {}
////export type { f };

// @Filename: /b.ts
////import { I, f } from "./a";
////export { type I, f };

goTo.file("/b.ts");

verify.codeFixAvailable([
    { description: "Use 'import type'" },
    { description: "Use 'type I'" },
    { description: "Use 'import type'" },
    { description: "Use 'type f'" },
]);

