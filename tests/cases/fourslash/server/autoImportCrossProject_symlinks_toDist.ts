/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/packages/app/package.json
//// { "name": "app", "dependencies": { "dep": "*" } }

// @Filename: /home/src/workspaces/project/packages/app/tsconfig.json
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

// @Filename: /home/src/workspaces/project/packages/app/src/index.ts
//// dep/**/


// @Filename: /home/src/workspaces/project/packages/dep/package.json
//// { "name": "dep", "main": "dist/index.js", "types": "dist/index.d.ts" }

// @Filename: /home/src/workspaces/project/packages/dep/tsconfig.json
//// {
////   "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
//// }

// @Filename: /home/src/workspaces/project/packages/dep/src/index.ts
//// import "./sub/folder";

// @Filename: /home/src/workspaces/project/packages/dep/src/sub/folder/index.ts
//// export const dep = 0;

// @link: /home/src/workspaces/project/packages/dep -> /home/src/workspaces/project/packages/app/node_modules/dep

goTo.marker("");
verify.importFixAtPosition([`import { dep } from "dep/dist/sub/folder";\r
\r
dep`]);
