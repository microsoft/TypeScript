/// <reference path="fourslash.ts" />

// @module: preserve

// @Filename: /node_modules/lib/index.d.ts
//// declare module "ambient" {
////     export const x: number;
//// }
//// declare module "ambient/utils" {
////    export const x: number;
//// }

// @Filename: /index.ts
//// x/**/

verify.importFixModuleSpecifiers("", ["ambient", "ambient/utils"]);
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["utils"] });
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["/.*?$"]});
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["^ambient/"] });
verify.importFixModuleSpecifiers("", ["ambient/utils"], { autoImportSpecifierExcludeRegexes: ["ambient$"] });
verify.importFixModuleSpecifiers("", ["ambient", "ambient/utils"], { autoImportSpecifierExcludeRegexes: ["oops("] });

verify.completions({
  marker: "",
  includes: [{
    name: "x",
    source: "ambient",
    sourceDisplay: "ambient",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }, {
    name: "x",
    source: "ambient/utils",
    sourceDisplay: "ambient/utils",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true
  }
});

verify.completions({
    marker: "",
    excludes: ["ambient/utils"],
    preferences: {
      includeCompletionsForModuleExports: true,
      allowIncompleteCompletions: true,
      autoImportSpecifierExcludeRegexes: ["utils"]
    },
})