/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /src/node_modules/#internal/package.json
//// {
////   "imports": {
////     "#thing": "./dist/something.js"
////   }
//// }

// @Filename: /src/node_modules/#internal/dist/something.d.ts
//// export function something(name: string): any;

// @Filename: /src/a.ts
//// import {} from "#internal//*1*/";

verify.completions({
    marker: ["1"],
    exact: [],
    isNewIdentifierLocation: true,
});
