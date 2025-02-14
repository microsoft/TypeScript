/// <reference path="fourslash.ts" />

// @module: node18
// @customConditions: custom-condition

// @Filename: /package.json
//// {
////   "name": "foo",
////   "imports": {
////     "#only-with-custom-conditions": {
////       "custom-condition": "./something.js"
////     },
////   }
//// }

// @Filename: /something.d.ts
//// export const index = 0;

// @Filename: /index.ts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#only-with-custom-conditions", kind: "script", kindModifiers: "" },
  ]
});
