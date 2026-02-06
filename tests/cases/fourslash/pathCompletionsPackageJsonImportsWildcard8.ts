/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "name": "foo",
////   "imports": {
////     "#*": "./dist/*.js"
////   }
//// }

// @Filename: /dist/blah.js
//// export const blah = 0;

// @Filename: /dist/blah.d.ts
//// export declare const blah: 0;

// @Filename: /index.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#blah", kind: "script", kindModifiers: "" },
  ]
});
