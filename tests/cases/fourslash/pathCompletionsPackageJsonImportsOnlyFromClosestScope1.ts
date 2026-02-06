/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "imports": {
////     "#thing": "./src/something.ts"
////   }
//// }

// @Filename: /src/package.json
//// {}

// @Filename: /src/something.ts
//// export function something(name: string): any;

// @Filename: /src/a.ts
//// import {} from "/*1*/";

// @Filename: /a.ts
//// import {} from "/*2*/";

verify.completions({
    marker: ["1"],
    exact: [],
    isNewIdentifierLocation: true,
});

verify.completions({
    marker: ["2"],
    exact: ["#thing"],
    isNewIdentifierLocation: true,
});
