/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.base.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "baseUrl": ".",
////     "paths": {
////       "packages/*": ["./packages/*"]
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/packages/app/tsconfig.json
//// {
////   "extends": "../../tsconfig.base.json",
////   "compilerOptions": { "outDir": "../../dist/packages/app" },
////   "references": [{ "path": "../dep" }]
//// }

// @Filename: /home/src/workspaces/project/packages/app/index.ts
//// dep/**/

// @Filename: /home/src/workspaces/project/packages/app/utils.ts
//// import "packages/dep";


// @Filename: /home/src/workspaces/project/packages/dep/tsconfig.json
//// {
////   "extends": "../../tsconfig.base.json",
////   "compilerOptions": { "outDir": "../../dist/packages/dep" }
//// }

// @Filename: /home/src/workspaces/project/packages/dep/index.ts
//// import "./sub/folder";

// @Filename: /home/src/workspaces/project/packages/dep/sub/folder/index.ts
//// export const dep = 0;

goTo.marker("");
verify.importFixAtPosition([`import { dep } from "packages/dep/sub/folder";\r
\r
dep`]);
