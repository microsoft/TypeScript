/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
////declare module "m" {
////    export class M {}
////}

// @Filename: /b.ts
////declare module "m" {
////    export interface M {}
////}

// @Filename: /c.ts
/////**/

verify.completions({
  marker: "",
  includes: {
      name: "M",
      source: "m",
      sourceDisplay: "m",
      text: "class M\ninterface M",
      kind: "class",
      kindModifiers: "export,declare",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
  },
  preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
  name: "M",
  source: "m",
  description: `Add import from "m"`,
  newFileContent: `import { M } from "m";

`,
});
