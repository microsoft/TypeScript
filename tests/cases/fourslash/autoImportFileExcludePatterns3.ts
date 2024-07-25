/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /ambient1.d.ts
//// declare module "foo" {
////    export const x = 1;
//// }

// @Filename: /ambient2.d.ts
//// declare module "foo" {
////    export const y = 2;
//// }

// @Filename: /index.ts
//// /**/

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    // We don't look at what file each individual export came from; we
    // only include or exclude modules wholesale, so excluding part of
    // an ambient module or a module augmentation isn't supported.
    name: "x",
    source: "foo",
    sourceDisplay: "foo",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }, {
    name: "y",
    source: "foo",
    sourceDisplay: "foo",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }]),
  preferences: {
    allowIncompleteCompletions: true,
    includeCompletionsForModuleExports: true,
    autoImportFileExcludePatterns: ["/**/ambient1.d.ts"],
  }
});

// Here, *every* file that declared "foo" is excluded.
verify.completions({
  marker: "",
  exact: completion.globals,
  preferences: {
    allowIncompleteCompletions: true,
    includeCompletionsForModuleExports: true,
    autoImportFileExcludePatterns: ["/**/ambient*"],
  }
});
