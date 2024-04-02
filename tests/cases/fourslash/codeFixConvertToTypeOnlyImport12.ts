/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /a.ts
////export function f() {}

// @Filename: /b.ts
////import { f } from "./a";
////export interface I {}
////type f = number;
////export { f };

goTo.file("/b.ts");
verify.codeFixAvailable([ ]);
