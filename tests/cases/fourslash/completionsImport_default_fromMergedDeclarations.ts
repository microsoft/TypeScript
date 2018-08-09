/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
////declare module "m" {
////    export default class M {}
////}

// @Filename: /b.ts
////declare module "m" {
////    export default interface M {}
////}

// @Filename: /c.ts
/////**/

goTo.marker("");
verify.completionListContains({ name: "M", source: "m" }, "class M", "", "class", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeCompletionsForModuleExports: true,
    sourceDisplay: "m",
});

verify.applyCodeActionFromCompletion("", {
    name: "M",
    source: "m",
    description: `Import default 'M' from module "m"`,
    newFileContent: `import M from "m";

`,
});
