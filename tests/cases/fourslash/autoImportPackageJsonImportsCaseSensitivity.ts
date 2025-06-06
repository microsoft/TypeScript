/// <reference path="fourslash.ts" />

// @module: node18
// @allowImportingTsExtensions: true

// @Filename: /package.json
//// {
////   "type": "module",
////   "imports": {
////     "#src/*": "./SRC/*"
////   }
//// }

// @Filename: /src/add.ts
//// export function add(a: number, b: number) {}

// @Filename: /src/index.ts
//// add/*imports*/;

verify.importFixModuleSpecifiers("imports", ["#src/add.ts"], { importModuleSpecifierPreference: "non-relative" });