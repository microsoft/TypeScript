/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "name": "foo",
////   "main": "dist/index.js",
////   "module": "dist/index.mjs",
////   "types": "dist/index.d.ts",
////   "imports": {
////     "#*": "./dist/*?.d.ts"
////   }
//// }

// @Filename: /dist/index.d.ts
//// export const index = 0;

// @Filename: /dist/blah?.d.ts
//// export const blah = 0;

// @Filename: /index.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#blah", kind: "script", kindModifiers: "" },
  ]
});
