/// <reference path="fourslash.ts" />

// @module: nodenext

// @Filename: /package.json
//// {
////   "name": "foo",
////   "imports": {
////     "#*": "./dist/*.js"
////   }
//// }

// @Filename: /dist/blah.d.ts
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
