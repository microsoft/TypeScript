/// <reference path="../fourslash.ts"/>

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist",
////     "declarationDir": "types",
////   }
//// }

// @Filename: /package.json
//// {
////   "type": "module",
////   "imports": {
////     "#is-browser": {
////       "types": "./types/env/browser.d.ts",
////       "default": "./not-dist-on-purpose/env/browser.js"
////     }
////   }
//// }

// @Filename: /src/env/browser.ts
//// export const isBrowser = true;

// @Filename: /src/a.ts
//// isBrowser/**/

verify.importFixModuleSpecifiers("", ["#is-browser"]);