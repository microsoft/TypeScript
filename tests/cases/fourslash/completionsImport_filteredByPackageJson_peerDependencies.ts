/// <reference path="fourslash.ts" />

//@noEmit: true

//@Filename: /package.json
////{
////  "peerDependencies": {
////    "react": "*"
////  }
////}

//@Filename: /node_modules/react/index.d.ts
////export declare var React: any;

//@Filename: /node_modules/react/package.json
////{
////  "name": "react",
////  "types": "./index.d.ts"
////}

//@Filename: /node_modules/fake-react/index.d.ts
////export declare var ReactFake: any;

//@Filename: /node_modules/fake-react/package.json
////{
////  "name": "fake-react",
////  "types": "./index.d.ts"
////}

//@Filename: /src/index.ts
////const x = Re/**/

verify.completions({
  marker: test.marker(""),
  isNewIdentifierLocation: true,
  includes: {
    name: "React",
    hasAction: true,
    source: "/node_modules/react/index",
    sortText: completion.SortText.AutoImportSuggestions
  },
  excludes: "ReactFake",
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
