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
////   "type": "module",
////   "imports": {
////     "#is-browser": {
////       "types": "./dist/env/browser.d.ts",
////       "default": "./dist/env/browser.js"
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/src/env/browser.ts
//// export const isBrowser = true;

// @Filename: /home/src/workspaces/project/src/a.ts
//// import {} from "/*1*/";

verify.completions({
    marker: ["1"],
    exact: ["#is-browser"],
    isNewIdentifierLocation: true,
});
