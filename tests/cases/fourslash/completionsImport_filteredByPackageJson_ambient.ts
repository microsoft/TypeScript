/// <reference path="fourslash.ts" />

//@noEmit: true

//@Filename: /package.json
////{
////  "dependencies": {
////    "react-syntax-highlighter": "*",
////    "declared-by-foo": "*"
////  }
////}

//@Filename: /node_modules/@types/foo/index.d.ts
////declare module "foo" {
////  export const foo: any;
////}
////declare module "declared-by-foo" {
////  export const declaredBySomethingNotInPackageJson: any;
////}

//@Filename: /node_modules/@types/foo/package.json
////{
////  "name": "@types/node"
////}

//@Filename: /node_modules/@types/react-syntax-highlighter/index.d.ts
////declare module "react-syntax-highlighter/sub" {
////  const agate: any;
////  export default agate;
////}
////declare module "something-else" {
////  export const somethingElse: any;  
////}

//@Filename: /node_modules/@types/react-syntax-highlighter/package.json
////{
////  "name": "@types/react-syntax-highlighter"
////}

//@Filename: /src/ambient.ts
////declare module "local" {
////  export const local: any';
////}

//@Filename: /src/index.ts
////fo/*1*/
////aga/*2*/
////somethi/*3*/
////declaredBy/*4*/
////loca/*5*/

// 1. Ambient modules declared in node_modules should be included if
//  a) the declaring package is in package.json, or
//  b) the ambient module name is in package.json

verify.completions({
  marker: test.marker("1"),
  exact: completion.globals,
  preferences: {
    includeCompletionsForModuleExports: true
  }
});

// sub-modules count
verify.completions({
  marker: test.marker("2"),
  includes: {
    name: "agate",
    source: "react-syntax-highlighter/sub",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  },
  preferences: {
    includeCompletionsForModuleExports: true
  }
});

// not in package.json but declared by something in package.json
verify.completions({
  marker: test.marker("3"),
  includes: {
    name: "somethingElse",
    source: "something-else",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  },
  preferences: {
    includeCompletionsForModuleExports: true
  }
});

// in package.json but declared by something not in package.json
verify.completions({
  marker: test.marker("4"),
  includes: {
    name: "declaredBySomethingNotInPackageJson",
    source: "declared-by-foo",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  },
  preferences: {
    includeCompletionsForModuleExports: true
  }
});

// 2. Ambient modules declared outside of node_modules should always be included
verify.completions({
  marker: test.marker("5"),
  includes: {
    name: "local",
    source: "local",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  },
  preferences: {
    includeCompletionsForModuleExports: true
  }
});
