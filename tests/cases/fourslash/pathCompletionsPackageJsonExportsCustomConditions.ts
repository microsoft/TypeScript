/// <reference path="fourslash.ts" />

// @module: node18
// @customConditions: custom-condition

// @Filename: /node_modules/foo/package.json
//// {
////   "name": "foo",
////   "exports": {
////     "./only-with-custom-conditions": {
////       "custom-condition": "./something.js"
////     },
////   }
//// }

// @Filename: /node_modules/foo/something.d.ts
//// export const index = 0;

// @Filename: /index.ts
//// import { } from "foo//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "only-with-custom-conditions", kind: "script", kindModifiers: "" },
  ]
});
