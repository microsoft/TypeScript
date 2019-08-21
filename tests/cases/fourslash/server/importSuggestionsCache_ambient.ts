/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
////{ compilerOptions: { "module": "esnext" } }

// @Filename: /ambient.d.ts
////declare module 'ambient' {
////  export const ambient = 0;
////}
////a/**/

goTo.marker("");
verify.completions({
  includes: {
    name: "ambient",
    source: "ambient",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  },
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
  },
});

edit.deleteLineRange(0, 2);
verify.completions({
  excludes: "ambient",
  preferences: {
    includeCompletionsForModuleExports: true,
    includeInsertTextCompletions: true,
  },
});
