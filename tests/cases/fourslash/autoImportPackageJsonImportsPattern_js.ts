/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /package.json
//// {
////   "imports": {
////     "#*": "./src/*.js"
////   }
//// }

// @Filename: /src/something.ts
//// export function something(name: string): any;

// @Filename: /a.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["#something"]);
