/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist"
////   }
//// }

// @Filename: /home/src/workspaces/project/package.json
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

// @Filename: /home/src/workspaces/project/src/action/pageObjects/actionRenderer.ts
//// export const actionRenderer = 0;

// @Filename: /home/src/workspaces/project/src/index.mts
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
