/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/@types/node/index.d.ts
//// declare module "fs" { function writeFile(): void }
//// declare module "fs/promises" { function writeFile(): Promise<void> }
//// declare module "node:fs" { export * from "fs"; }
//// declare module "node:fs/promises" { export * from "fs/promises"; }

// @Filename: /index.ts
//// write/**/

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "writeFile",
    source: "fs",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }, {
    name: "writeFile",
    source: "node:fs",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }, {
    name: "writeFile",
    source: "fs/promises",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }, {
    name: "writeFile",
    source: "node:fs/promises",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});
