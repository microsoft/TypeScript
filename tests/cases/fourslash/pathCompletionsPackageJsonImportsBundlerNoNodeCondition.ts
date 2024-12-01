/// <reference path="fourslash.ts" />

// @moduleResolution: bundler

// @Filename: /package.json
//// {
////   "name": "foo",
////   "imports": {
////     "#only-for-node": {
////       "node": "./something.js"
////     },
////     "#for-everywhere": "./other.js",
////   }
//// }

// @Filename: /something.d.ts
//// export const index = 0;

// @Filename: /other.d.ts
//// export const index = 0;

// @Filename: /index.ts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#for-everywhere", kind: "script", kindModifiers: "" },
  ]
});
