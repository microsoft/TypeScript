/// <reference path="fourslash.ts" />

// @module: esnext
// @moduleResolution: bundler

// @Filename: /node_modules/dep/package.json
//// {
////   "name": "dep",
////   "version": "1.0.0",
////   "exports": "./dist/index.js"
//// }

// @Filename: /node_modules/dep/dist/utils.d.ts
//// export const util: () => void;

// @Filename: /node_modules/dep/dist/index.d.ts
//// export * from "./utils";

// @Filename: /index.ts
//// util/**/

// Ensures we filter out the relative path through node_modules
// for the non-reexport source, which can only be accessed
// directly with the relative path since it's blocked by the
// package.json "exports" field.
verify.importFixModuleSpecifiers("", ["dep"]);
