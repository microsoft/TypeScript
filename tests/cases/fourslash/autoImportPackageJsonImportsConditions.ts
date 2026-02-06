/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "imports": {
////     "#thing": {
////         "types": { "import": "./types-esm/thing.d.mts", "require": "./types/thing.d.ts" },
////         "default": { "import": "./esm/thing.mjs", "require": "./dist/thing.js" }
////      }
////   }
//// }


// @Filename: /src/.ts
//// something/*a*/

// @Filename: /types/thing.d.ts
//// export function something(name: string): any;

verify.importFixModuleSpecifiers("a", ["#thing"]);
