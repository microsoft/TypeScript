/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /a.ts
////export interface f {}
////export interface I {}

// @Filename: /b.ts
////import { I, f } from "./a";
////export { type I, f };

goTo.file("/b.ts");

verify.codeFixAvailable([
    { description: "Use 'import type'" },
    { description: "Use 'type I'" },
    { description: "Use 'import type'" },
    { description: "Use 'type f'" },
    { description: "Convert to type-only export" },
]);

