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
////       "types": "./dist/env/browser.d.ts",
////       "default": "./dist/env/browser.js"
////     }
////   }
//// }

// @Filename: /src/env/browser.ts
//// export const isBrowser = true;

// @Filename: /src/a.ts
//// isBrowser/**/

verify.importFixModuleSpecifiers("", ["#is-browser"]);