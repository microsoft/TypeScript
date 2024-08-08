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
// case sensitive, no match
verify.importFixModuleSpecifiers("", ["ambient", "ambient/utils"], { autoImportSpecifierExcludeRegexes: ["/UTILS/"] });
// case insensitive flag given
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["/UTILS/i"] });
// invalid due to unescaped slash, treated as pattern
verify.importFixModuleSpecifiers("", ["ambient", "ambient/utils"], { autoImportSpecifierExcludeRegexes: ["/ambient/utils/"] });
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["/ambient\\/utils/"] });
// no trailing slash, treated as pattern, slash doesn't need to be escaped
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["/.*?$"]});
// no leading slash, treated as pattern, slash doesn't need to be escaped
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