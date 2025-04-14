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

// @Filename: /src/a/b/c/d.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["./something"]);
