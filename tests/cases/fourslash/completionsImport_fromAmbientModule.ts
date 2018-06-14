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
    description: `Import 'x' from module "m"`,
    newFileContent: `import { x } from "m";

`,
});
