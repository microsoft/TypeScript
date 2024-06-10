/// <reference path="fourslash.ts" />

// @module: preserve
// @allowImportingTsExtensions: true

// @Filename: /project/package.json
//// {
////   "name": "project",
////   "version": "1.0.0",
////   "imports": {
////     "#internal/*": "./src/internal/*.ts"
////   }
//// }

// @Filename: /project/src/internal/foo.ts
//// export const internalFoo = 0;

// @Filename: /project/src/other.ts
//// export * from "./internal/foo.ts";

// @Filename: /project/src/main.ts
//// internalFoo/**/

goTo.marker("");
verify.completions({
  includes: [
    {
      name: "internalFoo",
      source: "#internal/foo",
      sourceDisplay: "#internal/foo",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
  ],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    importModuleSpecifierPreference: "non-relative"
  },
});

verify.completions({
  includes: [
    {
      name: "internalFoo",
      source: "./other",
      sourceDisplay: "./other",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
  ],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    importModuleSpecifierPreference: "relative"
  },
});
