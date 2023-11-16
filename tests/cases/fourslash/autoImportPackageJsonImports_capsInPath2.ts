/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /Dev/package.json
//// {
////   "imports": {
////     "#thing/*": "./src/*.js"
////   }
//// }

// @Filename: /Dev/src/something.ts
//// export function something(name: string): any;

// @Filename: /Dev/a.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["#thing/something"]);
