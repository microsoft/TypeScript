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
////       "types": "./dist/index.d.ts",
////       "import": "./dist/index.mjs",
////       "default": "./dist/index.js"
////     },
////     "./*": {
////       "types": "./dist/*.d.ts",
////       "import": "./dist/*.mjs",
////       "default": "./dist/*.js"
////     },
////     "./arguments": {
////       "types": "./dist/arguments/index.d.ts",
////       "import": "./dist/arguments/index.mjs",
////       "default": "./dist/arguments/index.js"
////     }
////   }
//// }

// @Filename: /node_modules/foo/dist/index.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/dist/blah.d.ts
//// export const blah = 0;

// @Filename: /node_modules/foo/dist/arguments/index.d.ts
//// export const arguments = 0;

// @Filename: /index.mts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "blah", kind: "script", kindModifiers: "" },
    { name: "index", kind: "script", kindModifiers: "" },
    { name: "arguments", kind: "script", kindModifiers: "" },
  ]
});
