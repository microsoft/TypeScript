/// <reference path="fourslash.ts" />

// @module: esnext
// @verbatimModuleSyntax: true
// @filename: /b.ts
////export interface I {}
////export const foo = {};

// @filename: /a.ts
////import { I, foo } from "./b";

goTo.file("/a.ts");

verify.codeFixAvailable([
    { description: "Use 'type I'" },
    { description: "Remove import from './b'" }
]);

verify.codeFix({
    index: 0,
    description: `Use 'type I'`,
    newFileContent: `import { type I, foo } from "./b";`
});
