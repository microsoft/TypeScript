/// <reference path="fourslash.ts" />

//@noEmit: true

//@Filename: /package.json
////{
////  "dependencies": {
////    "@emotion/core": "*"
////  }
////}

//@Filename: /node_modules/@emotion/css/index.d.ts
////export declare const css: any;
////const css2: any;
////export { css2 };

//@Filename: /node_modules/@emotion/css/package.json
////{
////  "name": "@emotion/css",
////  "types": "./index.d.ts"
////}

//@Filename: /node_modules/@emotion/core/index.d.ts
////import { css2 } from "@emotion/css";
////export { css } from "@emotion/css";
////export { css2 };

//@Filename: /node_modules/@emotion/core/package.json
////{
////  "name": "@emotion/core",
////  "types": "./index.d.ts"
////}

//@Filename: /src/index.ts
////cs/**/

verify.completions({
  marker: test.marker(""),
  includes: [
    completion.undefinedVarEntry,
    {
      name: "css",
      source: "/node_modules/@emotion/core/index",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    {
      name: "css2",
      source: "/node_modules/@emotion/core/index",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    ...completion.statementKeywordsWithTypes
  ],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
