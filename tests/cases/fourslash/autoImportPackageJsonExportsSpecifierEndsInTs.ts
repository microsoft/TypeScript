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
//// foo/**/

verify.importFixModuleSpecifiers("", ["pkg/something.ts"]);
