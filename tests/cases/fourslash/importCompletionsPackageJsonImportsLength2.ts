/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "imports": {
////     "#*": "./src/*.ts"
////   }
//// }

// @Filename: /src/a/b/c/something.ts
//// export function something(name: string): any;

// @Filename: /a.ts
//// import {} from "/*1*/";
//// import {} from "#a//*2*/";
//// import {} from "#a/b//*3*/";
//// import {} from "#a/b/c//*4*/";
//// import {} from "#a/b/c/something//*5*/";

verify.completions({
    marker: ["1"],
    exact: ["#a"],
    isNewIdentifierLocation: true,
});
verify.completions({
    marker: ["2"],
    exact: ["b"],
    isNewIdentifierLocation: true,
});
verify.completions({
    marker: ["3"],
    exact: ["c"],
    isNewIdentifierLocation: true,
});
verify.completions({
    marker: ["4"],
    exact: ["something"],
    isNewIdentifierLocation: true,
});
verify.completions({
    marker: ["5"],
    exact: [],
    isNewIdentifierLocation: true,
});

