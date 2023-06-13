/// <reference path="fourslash.ts" />

// @moduleResolution: bundler

// @Filename: /node_modules/foo/package.json
//// {
////   "name": "foo",
////   "exports": {
////     "./only-for-node": {
////       "node": "./something.js"
////     },
////     "./for-everywhere": "./other.js",
////   }
//// }

// @Filename: /node_modules/foo/something.d.ts
//// export const index = 0;

// @Filename: /node_modules/foo/other.d.ts
//// export const index = 0;

// @Filename: /index.ts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "for-everywhere", kind: "script", kindModifiers: "" },
  ]
});
