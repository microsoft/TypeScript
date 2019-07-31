/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const a = 0;
/////*a*/

// @Filename: /b.ts
////export const b = 0;
////a/*b*/


// 1. Populate the cache for file b.ts
verify.completions({
  marker: "b",
  includes: {
    name: "a",
    source: "/a",
    text: "const a: 0",
    hasAction: true,
    sourceDisplay: "./a",
    sortText: completion.SortText.AutoImportSuggestions,
  },
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
  },
});

// 2. Add another export to a.ts
goTo.marker("a");
edit.insertLine("export const aa = 0;");

// 3. Validate that the new export shows up in b.ts
verify.completions({
  marker: "b",
  includes: {
    name: "aa",
    source: "/a",
    text: "const aa: 0",
    hasAction: true,
    sourceDisplay: "./a",
    sortText: completion.SortText.AutoImportSuggestions,
  },
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
  },
});
