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
////       "browser": "./dist/env/browser.js",
////       "default": "./dist/env/node.js"
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/src/env/browser.ts
//// export const isBrowser = true;

// @Filename: /home/src/workspaces/project/src/env/node.ts
//// export const isBrowser = false;

// @Filename: /home/src/workspaces/project/src/a.ts
//// isBrowser/**/

verify.importFixModuleSpecifiers("", ["#is-browser", "./env/browser.js"]);
