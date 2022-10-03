/// <reference path="fourslash.ts" />

//@noEmit: true

//@Filename: /package.json
////{
////  "devDependencies": {
////    "@types/react": "*"
////  }
////}

//@Filename: /node_modules/@types/react/index.d.ts
////export declare var React: any;

//@Filename: /node_modules/@types/react/package.json
////{
////  "name": "@types/react"
////}

//@Filename: /node_modules/@types/fake-react/index.d.ts
////export declare var ReactFake: any;

//@Filename: /node_modules/@types/fake-react/package.json
////{
////  "name": "@types/fake-react"
////}

//@Filename: /src/index.ts
////const x = Re/**/

verify.completions({
  marker: test.marker(""),
  isNewIdentifierLocation: true,
  includes: {
    name: "React",
    hasAction: true,
    source: "/node_modules/@types/react/index",
    sortText: completion.SortText.AutoImportSuggestions
  },
  excludes: "ReactFake",
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
