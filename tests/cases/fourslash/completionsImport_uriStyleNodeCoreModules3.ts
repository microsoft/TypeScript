/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/@types/node/index.d.ts
//// declare module "path" { function join(...segments: readonly string[]): string; }
//// declare module "node:path" { export * from "path"; }
//// declare module "fs" { function writeFile(): void }
//// declare module "fs/promises" { function writeFile(): Promise<void> }
//// declare module "node:fs" { export * from "fs"; }
//// declare module "node:fs/promises" { export * from "fs/promises"; }

// @Filename: /other.ts
//// import "node:fs/promises";

// @Filename: /noPrefix.ts
//// import "path";
//// write/*noPrefix*/

// @Filename: /prefix.ts
//// import "node:path";
//// write/*prefix*/

// @Filename: /mixed1.ts
//// import "path";
//// import "node:path";
//// write/*mixed1*/

// @Filename: /mixed2.ts
//// import "node:path";
//// import "path";
//// write/*mixed2*/

// @Filename: /test1.ts
//// import "node:test";
//// import "path";
//// writeFile/*test1*/

// @Filename: /test2.ts
//// import "node:test";
//// writeFile/*test2*/

verify.completions({
  marker: "noPrefix",
  exact: completion.globalsPlus([{
    name: "writeFile",
    source: "fs",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }, {
    name: "writeFile",
    source: "fs/promises",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});

verify.completions({
  marker: "prefix",
  exact: completion.globalsPlus([{
    name: "writeFile",
    source: "node:fs",
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

// Prefixed imports take precedence over non-prefixed imports when mixed

verify.completions({
  marker: "mixed1",
  exact: completion.globalsPlus([{
    name: "writeFile",
    source: "node:fs",
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

verify.completions({
  marker: "mixed2",
  exact: completion.globalsPlus([{
    name: "writeFile",
    source: "node:fs",
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

// Unless the prefixed import is not available unprefixed

verify.importFixModuleSpecifiers("test1", ["fs", "fs/promises"]);
verify.importFixModuleSpecifiers("test2", ["node:fs", "node:fs/promises"]);

verify.completions({
  marker: "test1",
  exact: completion.globalsPlus([{
    name: "writeFile",
    source: "fs",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }, {
    name: "writeFile",
    source: "fs/promises",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});

verify.completions({
  marker: "test2",
  exact: completion.globalsPlus([{
    name: "writeFile",
    source: "node:fs",
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