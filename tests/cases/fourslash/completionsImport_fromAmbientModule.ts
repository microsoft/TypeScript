/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
////declare module "m" {
////    export const x: number;
////}

// @Filename: /b.ts
/////**/

verify.applyCodeActionFromCompletion("", {
    name: "x",
    source: "m",
    description: `Add import from "m"`,
    newFileContent: `import { x } from "m";

`,
});
