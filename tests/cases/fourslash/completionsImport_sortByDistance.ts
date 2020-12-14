/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /src/admin/utils/db/db.ts
//// export const db = {};

// @Filename: /src/admin/utils/db/index.ts
//// export * from "./db";

// @Filename: /src/client/helpers/db.ts
//// export const db = {};

// @Filename: /src/client/db.ts
//// export const db = {};

// @Filename: /src/client/foo.ts
//// db/**/

verify.completions({
  marker: "",
  exact: [
    completion.globalThisEntry,
    ...completion.globalsVars,
    completion.undefinedVarEntry,
    {
      name: "db",
      source: "/src/client/db",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    {
      name: "db",
      source: "/src/client/helpers/db",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    {
      name: "db",
      source: "/src/admin/utils/db/index",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    ...completion.globalKeywords
  ],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
