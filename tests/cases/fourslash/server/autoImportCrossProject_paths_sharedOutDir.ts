/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.base.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "baseUrl": ".",
////     "paths": {
////       "packages/*": ["./packages/*"]
////     }
////   }
//// }

// @Filename: /packages/app/tsconfig.json
//// {
////   "extends": "../../tsconfig.base.json",
////   "compilerOptions": { "outDir": "../../dist/packages/app" },
////   "references": [{ "path": "../dep" }]
//// }

// @Filename: /packages/app/index.ts
//// dep/**/

// @Filename: /packages/app/utils.ts
//// import "packages/dep";


// @Filename: /packages/dep/tsconfig.json
//// {
////   "extends": "../../tsconfig.base.json",
////   "compilerOptions": { "outDir": "../../dist/packages/dep" }
//// }

// @Filename: /packages/dep/index.ts
//// import "./sub/folder";

// @Filename: /packages/dep/sub/folder/index.ts
//// export const dep = 0;

goTo.marker("");
verify.importFixAtPosition([`import { dep } from "packages/dep/sub/folder";\r
\r
dep`]);
