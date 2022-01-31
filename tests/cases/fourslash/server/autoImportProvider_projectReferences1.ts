/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////     "files": [],
////     "references": [
////         { "path": "packages/lib" },
////         { "path": "packages/app" }
////     ]
//// }

// @Filename: /packages/lib/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs"
////     }
//// }

// @Filename: /packages/lib/index.ts
//// export const x = 0;

// @Filename: /packages/app/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs"
////     },
////     "references": [
////         { "path": "../lib" }
////     ]
//// }

// @Filename: /packages/app/index.ts
//// x/**/

goTo.marker("");
verify.importFixModuleSpecifiers("", ["../lib"]);

verify.completions()