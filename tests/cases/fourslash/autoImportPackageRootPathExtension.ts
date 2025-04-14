/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /node_modules/pkg/package.json
//// {
////     "name": "pkg",
////     "version": "1.0.0",
////     "main": "lib"
////  }

// @Filename: /node_modules/pkg/lib/index.d.mts
//// export declare function foo(): any;

// @Filename: /package.json
//// {
////     "dependencies": {
////        "pkg": "*"
////     }
////  }

// @Filename: /index.ts
//// foo/**/

verify.importFixModuleSpecifiers("", ["pkg/lib/index.mjs"]);
