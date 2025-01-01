/// <reference path="fourslash.ts" />

// @module: preserve

// @Filename: /node_modules/pkg/package.json
//// {
////     "name": "pkg",
////     "version": "1.0.0",
////     "exports": {
////         ".": "./index.js",
////         "./utils": "./utils.js"
////     }
//// }

// @Filename: /node_modules/pkg/utils.d.ts
//// export function add(a: number, b: number) {}

// @Filename: /node_modules/pkg/index.d.ts
//// export * from "./utils";

// @Filename: /src/index.ts
//// add/**/

verify.importFixModuleSpecifiers("", ["pkg", "pkg/utils"]);
verify.importFixModuleSpecifiers("", ["pkg/utils"], { autoImportSpecifierExcludeRegexes: ["^pkg$"] });
