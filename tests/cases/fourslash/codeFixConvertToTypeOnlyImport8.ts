/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: esnext
// @moduleResolution: bundler
// @target: esnext

// @filename: /a.ts
////export function f() {}

// @Filename: /b.ts
////export type * as b from "./a.js";

// @Filename: /c.ts
////import { b } from "./b.js";

goTo.file("/c.ts");
verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Use_import_type.message,
    newFileContent: `import type { b } from "./b.js";`,
});
