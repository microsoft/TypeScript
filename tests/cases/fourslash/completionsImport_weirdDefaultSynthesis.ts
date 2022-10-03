/// <reference path="fourslash.ts" />

// @Filename: /collection.ts
//// class Collection {
////   public static readonly default: typeof Collection = Collection;
//// }
//// export = Collection as typeof Collection & { default: typeof Collection };

// @Filename: /index.ts
//// Colle/**/

verify.applyCodeActionFromCompletion("", {
  name: "Collection",
  source: "/collection",
  description: `Add import from "./collection"`,
  preferences: {
    includeCompletionsForModuleExports: true
  },
  newFileContent: `import Collection = require("./collection");\n\nColle`
});
