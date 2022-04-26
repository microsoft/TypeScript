/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /deep/module/why/you/want/this/path.ts
//// export const x = 0;
//// export const y = 1;

// @Filename: /nice/reexport.ts
//// import { x, y } from "../deep/module/why/you/want/this/path";
//// export { x, y };

// @Filename: /index.ts
//// import { x } from "./deep/module/why/you/want/this/path";
////
//// y/**/

verify.completions({
  marker: "",
  exact: completion.globalsPlus(["x", {
    name: "y",
    source: "./deep/module/why/you/want/this/path",
    sourceDisplay: "./deep/module/why/you/want/this/path",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  },
});
