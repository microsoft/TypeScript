/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /node_modules/foo/package.json
//// {
////   "name": "foo",
////   "main": "dist/index.js",
////   "module": "dist/index.mjs",
////   "types": "dist/index.d.ts",
////   "exports": {
////     "./*": "./dist/*?.d.ts"
////   }
//// }

// @Filename: /node_modules/foo/dist/index.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/dist/blah?.d.ts
//// export const blah = 0;

// @Filename: /index.mts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "blah", kind: "script", kindModifiers: "" },
  ]
});
