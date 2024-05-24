/// <reference path="fourslash.ts" />

// @Filename: c:/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "paths": {
////       "~/noIndex/*": ["./src/noIndex/*"],
////       "~/withIndex": ["./src/withIndex/index.ts"]
////     }
////   }
//// }

// @Filename: c:/project/package.json
//// {}

// @Filename: c:/project/src/noIndex/a.ts
//// export const myFunctionA = () => {};

// @Filename: c:/project/src/withIndex/b.ts
//// export const myFunctionB = () => {};

// @Filename: c:/project/src/withIndex/index.ts
//// export * from './b';

// @Filename: c:/project/src/reproduction/1.ts
//// myFunction/**/

goTo.marker("");
verify.completions({
  includes: [
    {
      name: "myFunctionA",
      source: "~/noIndex/a",
      sourceDisplay: "~/noIndex/a",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
    {
      name: "myFunctionB",
      source: "~/withIndex",
      sourceDisplay: "~/withIndex",
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
      name: "myFunctionA",
      source: "../noIndex/a",
      sourceDisplay: "../noIndex/a",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
    {
      name: "myFunctionB",
      source: "../withIndex",
      sourceDisplay: "../withIndex",
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

verify.completions({
  includes: [
    {
      name: "myFunctionA",
      source: "../noIndex/a",
      sourceDisplay: "../noIndex/a",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
    {
      name: "myFunctionB",
      source: "../withIndex",
      sourceDisplay: "../withIndex",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions,
    },
  ],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    importModuleSpecifierPreference: "project-relative"
  },
});