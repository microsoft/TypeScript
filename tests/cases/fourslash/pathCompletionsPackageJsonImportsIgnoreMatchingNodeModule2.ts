/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "imports": {
////     "#internal/*": "./src/*.ts"
////   }
//// }

// @Filename: /src/something.ts
//// export function something(name: string): any;

// @Filename: /src/node_modules/#internal/package.json
//// {}

// @Filename: /src/a.ts
//// import {} from "#internal//*1*/";

verify.completions({
    marker: ["1"],
    exact: ["a", "something"],
    isNewIdentifierLocation: true,
});
