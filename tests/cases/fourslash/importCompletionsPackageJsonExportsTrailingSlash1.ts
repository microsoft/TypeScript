/// <reference path="fourslash.ts" />

// @module: node18
// @moduleResolution: nodenext

// @Filename: /node_modules/pkg/package.json
//// {
////     "name": "pkg",
////     "version": "1.0.0",
////     "exports": {
////       "./test/": "./"
////     }
////  }

// @Filename: /node_modules/pkg/foo.d.ts
//// export function foo(): void;

// @Filename: /package.json
//// {
////     "dependencies": {
////        "pkg": "*"
////     }
////  }

// @Filename: /index.ts
//// import {} from "pkg//*1*/";
//// import {} from "pkg/test//*2*/";

verify.completions({
    marker: ["1"],
    exact: ["test"],
    isNewIdentifierLocation: true,
});
verify.completions({
    marker: ["2"],
    exact: ["foo.js"],
    isNewIdentifierLocation: true,
});
