/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "name": "foo",
////   "main": "dist/index.js",
////   "module": "dist/index.mjs",
////   "types": "dist/index.d.ts",
////   "imports": {
////     "#*": {
////       "types": "./dist/*.d.ts",
////       "import": "./dist/*.mjs",
////       "default": "./dist/*.js"
////     },
////     "#arguments": {
////       "types": "./dist/arguments/index.d.ts",
////       "import": "./dist/arguments/index.mjs",
////       "default": "./dist/arguments/index.js"
////     }
////   }
//// }

// @Filename: /dist/index.d.ts
//// export const index = 0;

// @Filename: /dist/blah.d.ts
//// export const blah = 0;

// @Filename: /dist/arguments/index.d.ts
//// export const arguments = 0;

// @Filename: /index.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#blah", kind: "script", kindModifiers: "" },
    { name: "#index", kind: "script", kindModifiers: "" },
    { name: "#arguments", kind: "script", kindModifiers: "" },
  ]
});
