/// <reference path="fourslash.ts" />

// @module: node18
// @allowImportingTsExtensions: true

// @Filename: /package.json
//// {
////   "imports": {
////     "#*": "./src/*"
////   }
//// }

// @Filename: /src/something.ts
//// export function something(name: string): any;

// @Filename: /a.ts
//// import {} from "/*1*/";

verify.completions({
    marker: ["1"],
    exact: ["#something.ts"],
    isNewIdentifierLocation: true,
});
