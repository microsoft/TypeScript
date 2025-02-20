/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /Dev/package.json
//// {
////   "imports": {
////     "#thing": "./src/something.js"
////   }
//// }

// @Filename: /Dev/src/something.ts
//// export function something(name: string): any;

// @Filename: /Dev/a.ts
//// import {} from "/*1*/";

verify.completions({
    marker: ["1"],
    exact: ["#thing"],
    isNewIdentifierLocation: true,
});
