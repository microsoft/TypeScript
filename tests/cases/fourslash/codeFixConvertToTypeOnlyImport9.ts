/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /a.ts
////export function f() {}
////export interface I {}

// @Filename: /b.ts
////[|import { I, f } from "./a";|]
////export { type I, f };

goTo.file("/b.ts");

verify.codeFixAvailable([
    { description: "Use 'type I'" }
]);

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Use_type_0.message, "I"],
    newRangeContent: `import { type I, f } from "./a";`,
});
