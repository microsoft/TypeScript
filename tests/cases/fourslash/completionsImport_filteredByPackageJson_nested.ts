/// <reference path="fourslash.ts" />

//@noEmit: true

//@Filename: /package.json
////{
////  "dependencies": {
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

//@Filename: /dir/package.json
////{
////  "dependencies": {
////    "redux": "*"
////  }
////}

//@Filename: /dir/node_modules/redux/package.json
////{
////  "name": "redux",
////  "types": "./index.d.ts"
////}

//@Filename: /dir/node_modules/redux/index.d.ts
////export declare var Redux: any;

//@Filename: /dir/index.ts
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
  preferences: {
    includeCompletionsForModuleExports: true
  }
});

verify.completions({
  marker: test.marker(""),
  isNewIdentifierLocation: true,
  includes: {
    name: "Redux",
    hasAction: true,
    source: "/dir/node_modules/redux/index",
    sortText: completion.SortText.AutoImportSuggestions
  },
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
