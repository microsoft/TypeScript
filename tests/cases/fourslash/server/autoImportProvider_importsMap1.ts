/// <reference path="../fourslash.ts"/>

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist"
////   }
//// }

// @Filename: /package.json
//// {
////   "type": "module",
////   "imports": {
////     "#is-browser": {
////       "browser": "./dist/env/browser.js",
////       "default": "./dist/env/node.js"
////     }
////   }
//// }

// @Filename: /src/env/browser.ts
//// export const isBrowser = true;

// @Filename: /src/env/node.ts
//// export const isBrowser = false;

// @Filename: /src/a.ts
//// isBrowser/**/

verify.importFixModuleSpecifiers("", ["./env/browser.js", "#is-browser"]);