/// <reference path="fourslash.ts" />

// @module: node18

// @Filename: /node_modules/salesforce-pageobjects/package.json
//// {
////   "name": "salesforce-pageobjects",
////   "version": "1.0.0",
////   "exports": {
////     "./*": {
////       "types": "./dist/*.d.ts",
////       "import": "./dist/*.mjs",
////       "default": "./dist/*.js"
////     }
////   }
//// }

// @Filename: /node_modules/salesforce-pageobjects/dist/action/pageObjects/actionRenderer.d.ts
//// export const actionRenderer = 0;

// @Filename: /index.mts
//// import { } from "salesforce-pageobjects//**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [{ name: "action", kind: "directory" }]
});

edit.insert("action/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [{ name: "pageObjects", kind: "directory" }],
});

edit.insert("pageObjects/");

verify.completions({
  isNewIdentifierLocation: true,
  exact: [{ name: "actionRenderer", kind: "script" }],
});
