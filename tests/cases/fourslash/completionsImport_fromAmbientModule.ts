/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////declare module "m" {
////    export const x: number;
////}

// @Filename: /b.ts
/////**/

verify.applyCodeActionFromCompletion("", {
    name: "x",
    description: `Import 'x' from "m".`,
    // TODO: GH#18445
    newFileContent: `import { x } from "m";\r
\r
`,
});
