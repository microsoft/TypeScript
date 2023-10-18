/// <reference path="fourslash.ts" />

// @module: esnext
// @verbatimModuleSyntax: true
// @filename: /b.ts
////export interface I {}
////export const foo = {};

// @filename: /a.ts
//// import { I, type foo } from "./b";
//// export declare const x: typeof foo;

goTo.file("/a.ts");
verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Use_import_type.message,
    newFileContent: `import type { I, foo } from "./b";
export declare const x: typeof foo;`,
});

verify.codeFix({
    index: 1,
    description: `Use 'type I'`,
    newFileContent: `import { type I, type foo } from "./b";
export declare const x: typeof foo;`,
});
