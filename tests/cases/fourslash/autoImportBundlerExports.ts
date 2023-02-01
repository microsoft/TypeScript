/// <reference path="fourslash.ts" />

// @module: esnext
// @moduleResolution: bundler

// @Filename: /node_modules/dep/package.json
//// {
////   "name": "dep",
////   "version": "1.0.0",
////   "exports": {
////     ".": "./dist/index.js"
////   }
//// }

// @Filename: /node_modules/dep/dist/index.d.ts
//// export const dep: number;

// @Filename: /index.ts
//// dep/**/

verify.importFixModuleSpecifiers("", ["dep"]);
