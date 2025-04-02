/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /package.json
//// {
////   "name": "salesforce-pageobjects",
////   "version": "1.0.0",
////   "imports": {
////     "#*": {
////       "types": "./dist/*.d.ts",
////       "import": "./dist/*.mjs",
////       "default": "./dist/*.js"
////     }
////   }
//// }

// @Filename: /dist/action/pageObjects/actionRenderer.d.ts
//// export const actionRenderer = 0;

// @Filename: /index.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [{ name: "#action", kind: "directory" }]
});

edit.insert("#action/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [{ name: "pageObjects", kind: "directory" }],
});

edit.insert("pageObjects/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [{ name: "actionRenderer", kind: "script" }],
});
