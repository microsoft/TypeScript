/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /node_modules/pkg/package.json
//// {
////     "name": "pkg",
////     "version": "1.0.0",
////     "main": "lib",
////     "module": "lib"
////  }

// @Filename: /node_modules/pkg/lib/index.js
//// export function foo() {};

// @Filename: /package.json
//// {
////     "dependencies": {
////        "pkg": "*"
////     }
////  }

// @Filename: /index.ts
//// foo/**/

verify.importFixModuleSpecifiers("", ["pkg"]);
