/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /package.json
//// {
////   "imports": {
////     "#/*": "./src/*"
////   }
//// }

// @Filename: /src/something.ts
//// export function something(name: string): any;

// @Filename: /src/features/bar.ts
//// export function bar(): any;

// @Filename: /a.ts
//// import {} from "#//*1*/";

verify.completions({
    marker: ["1"],
    exact: ["something.js", "features"],
    isNewIdentifierLocation: true,
});
