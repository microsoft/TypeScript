/// <reference path="fourslash.ts" />

// @module: node18
// @allowJs: true

// @Filename: /package.json
//// {
////   "name": "foo",
////   "imports": {
////     "#*": "./dist/*.js"
////   }
//// }

// @Filename: /dist/blah.js
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
