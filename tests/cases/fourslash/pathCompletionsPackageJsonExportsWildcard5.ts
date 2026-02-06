/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /node_modules/foo/package.json
//// {
////   "name": "foo",
////   "main": "dist/index.js",
////   "module": "dist/index.mjs",
////   "types": "dist/index.d.ts",
////   "exports": {
////     ".": {
////       "import": {
////         "types": "./dist/types/index.d.mts",
////         "default": "./dist/esm/index.mjs"
////       },
////       "default": {
////         "types": "./dist/types/index.d.ts",
////         "default": "./dist/cjs/index.js"
////       }
////     },
////     "./*": {
////       "import": {
////         "types": "./dist/types/*.d.mts",
////         "default": "./dist/esm/*.mjs"
////       },
////       "default": {
////         "types": "./dist/types/*.d.ts",
////         "default": "./dist/cjs/*.js"
////       }
////     },
////     "./only-in-cjs": {
////       "require": {
////         "types": "./dist/types/only-in-cjs/index.d.ts",
////         "default": "./dist/cjs/only-in-cjs/index.js"
////       }
////     }
////   }
//// }

// @Filename: /node_modules/foo/dist/types/index.d.mts
//// export const index = 0;

// @Filename: /node_modules/foo/dist/types/index.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/dist/types/blah.d.mts
//// export const blah = 0;

// @Filename: /node_modules/foo/dist/types/blah.d.ts
//// export const blah = 0;

// @Filename: /node_modules/foo/dist/types/only-in-cjs/index.d.ts
//// export const onlyInCjs = 0;

// @Filename: /index.mts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "blah", kind: "script", kindModifiers: "" },
    { name: "index", kind: "script", kindModifiers: "" },
  ]
});
