/// <reference path="fourslash.ts" />

//@noEmit: true

//@Filename: /package.json
////{
////  "dependencies": {
////    "b_": "*",
////    "_c": "*"
////  }
////}

//@Filename: /node_modules/a/index.d.ts
////export const foo = 0;

//@Filename: /node_modules/a/package.json
////{
////  "name": "a",
////  "types": "./index.d.ts"
////}

//@Filename: /node_modules/b_/index.d.ts
////export { foo } from "a";

//@Filename: /node_modules/b_/package.json
////{
////  "name": "b_",
////  "types": "./index.d.ts"
////}

//@Filename: /node_modules/_c/index.d.ts
////export { foo } from "b_";

//@Filename: /node_modules/_c/package.json
////{
////  "name": "_c",
////  "types": "./index.d.ts"
////}

//@Filename: /src/index.ts
////fo/**/

verify.completions({
  marker: test.marker(""),
  includes: [
    completion.undefinedVarEntry,
    {
      name: "foo",
      source: "/node_modules/b_/index",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    ...completion.statementKeywordsWithTypes
  ],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
