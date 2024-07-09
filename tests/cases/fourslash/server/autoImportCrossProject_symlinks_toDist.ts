/// <reference path="../fourslash.ts" />

// @Filename: /packages/app/package.json
//// { "name": "app", "dependencies": { "dep": "*" } }

// @Filename: /packages/app/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "outDir": "dist",
////     "rootDir": "src",
////     "baseUrl": ".",
////     "paths": {
////       "dep/dist/*": ["../dep/src/*"]  
////     }
////   }
////   "references": [{ "path": "../dep" }]
//// }

// @Filename: /packages/app/src/index.ts
//// dep/**/


// @Filename: /packages/dep/package.json
//// { "name": "dep", "main": "dist/index.js", "types": "dist/index.d.ts" }

// @Filename: /packages/dep/tsconfig.json
//// {
////   "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
//// }

// @Filename: /packages/dep/src/index.ts
//// import "./sub/folder";

// @Filename: /packages/dep/src/sub/folder/index.ts
//// export const dep = 0;

// @link: /packages/dep -> /packages/app/node_modules/dep

goTo.marker("");
verify.importFixAtPosition([`import { dep } from "dep/dist/sub/folder";\r
\r
dep`]);
