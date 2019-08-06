/// <reference path="fourslash.ts" />

//@noEmit: true

//@Filename: /package.json
////{
////  "dependencies": {
////    "b": "*"
////  }
////}

//@Filename: /node_modules/a/index.d.ts
////export const foo = 0;

//@Filename: /node_modules/a/package.json
////{
////  "name": "a",
////  "types": "./index.d.ts"
////}

//@Filename: /node_modules/b/index.d.ts
////export * from "a";

//@Filename: /node_modules/b/package.json
////{
////  "name": "b",
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
      source: "/node_modules/b/index",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
    },
    ...completion.statementKeywordsWithTypes
  ],
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
