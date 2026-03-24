/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /node_modules/pkg/package.json
//// {
////     "name": "pkg",
////     "version": "1.0.0",
////     "exports": {
////       "./something.ts": "./a.js"
////     }
////  }

// @Filename: /node_modules/pkg/a.d.ts
//// export function foo(): void;

// @Filename: /package.json
//// {
////     "dependencies": {
////        "pkg": "*"
////     }
////  }

// @Filename: /index.ts
//// import {} from "pkg//*1*/";

verify.completions({
    marker: ["1"],
    exact: ["something.ts"],
    isNewIdentifierLocation: true,
});
