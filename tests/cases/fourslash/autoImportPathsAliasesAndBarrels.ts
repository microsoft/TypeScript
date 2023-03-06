/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////  "compilerOptions": {
////    "module": "commonjs",
////    "paths": {
////      "~/*": ["src/*"]  
////    }
////  }
////}

// @Filename: /src/dirA/index.ts
//// export * from "./thing1A";
//// export * from "./thing2A";

// @Filename: /src/dirA/thing1A.ts
//// export class Thing1A {}
//// Thing/**/

// @Filename: /src/dirA/thing2A.ts
//// export class Thing2A {}

// @Filename: /src/dirB/index.ts
//// export * from "./thing1B";
//// export * from "./thing2B";

// @Filename: /src/dirB/thing1B.ts
//// export class Thing1B {}

// @Filename: /src/dirB/thing2B.ts
//// export class Thing2B {}

verify.completions({
  marker: "",
  includes: [{
    name: "Thing2A",
    source: "./thing2A",
    sourceDisplay: "./thing2A",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }, {
    name: "Thing1B",
    source: "~/dirB",
    sourceDisplay: "~/dirB",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }, {
    name: "Thing2B",
    source: "~/dirB",
    sourceDisplay: "~/dirB",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  },
});
