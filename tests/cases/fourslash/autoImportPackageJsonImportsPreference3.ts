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

// @Filename: /src/a/b/c/d.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["#a/b/c/something"], {
  importModuleSpecifierPreference: "non-relative"
});
