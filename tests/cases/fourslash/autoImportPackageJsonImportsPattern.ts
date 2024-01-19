/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /package.json
//// {
////   "imports": {
////     "#*": "./src/*"
////   }
//// }

// @Filename: /src/something.ts
//// export function something(name: string): any;

// @Filename: /a.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["#something.js"]);
