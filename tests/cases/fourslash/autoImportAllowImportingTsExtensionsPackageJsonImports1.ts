/// <reference path="fourslash.ts" />

// @module: node18
// @allowImportingTsExtensions: true

// @Filename: /node_modules/pkg/package.json
//// {
////   "name": "pkg",
////   "type": "module",
////   "exports": {
////     "./*": {
////       "types": "./types/*",
////       "default": "./dist/*"
////     }
////   }
//// }

// @Filename: /node_modules/pkg/types/external.d.ts
//// export declare function external(name: string): any;

// @Filename: /package.json
//// {
////   "name": "self",
////   "type": "module",
////   "imports": {
////     "#*": "./src/*"
////   },
////   "dependencies": {
////     "pkg": "*"
////   }
//// }

// @Filename: /src/add.ts
//// export function add(a: number, b: number) {}

// @Filename: /src/index.ts
//// add/*imports*/;
//// external/*exports*/;

verify.importFixModuleSpecifiers("imports", ["#add.ts"]);
verify.importFixModuleSpecifiers("exports", ["pkg/external.js"]);
