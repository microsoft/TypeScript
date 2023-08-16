/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /package.json
//// {
////   "imports": {
////     "#*": "./src/*.ts"
////   }
//// }

// @Filename: /src/a/b/c/something.ts
//// export function something(name: string): any;

// @Filename: /a.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["./src/a/b/c/something"], {
  importModuleSpecifierPreference: "project-relative"
});
