/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "imports": {
////     "#thing": "./src/something.ts"
////   }
//// }

// @Filename: /src/something.ts
//// export function something(name: string): any;

// @Filename: /a.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["#thing"]);
