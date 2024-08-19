/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /os.d.ts
//// declare module "os" {
////   export function type(): string;
//// }

// @Filename: /index.ts
//// type/**/

verify.completions({
  marker: "",
  includes: [
    {
      name: "type",
      sortText: completion.SortText.GlobalsOrKeywords,
    },
    {
      name: "type",
      source: "os",
      sourceDisplay: "os",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    }
  ],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  },
});
