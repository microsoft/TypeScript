/// <reference path="fourslash.ts" />

// @module: esnext
// @verbatimModuleSyntax: true
// @filename: /b.ts
////export interface I {}
////export const foo = {};

// @filename: /a.ts
////import { I, foo } from "./b";
////foo;
////export declare const i: I;

// ^ usage prevents 'Remove unused declaration' fix,
//   so that lack of `index` option asserts only one fix is available.
//   Specifically, we ensure no `Use 'import type'` fix is offered.

goTo.file("/a.ts");
verify.codeFix({
    description: `Use 'type I'`,
    newFileContent: `import { type I, foo } from "./b";
foo;
export declare const i: I;`,
});
