/// <reference path="../fourslash.ts" />

// @Filename: /package.json
//// {
////     "name": "monorepo",
////     "workspaces": ["packages/*"]
//// }

// @Filename: /packages/utils/package.json
//// {
////     "name": "utils",
////     "version": "1.0.0",
////     "exports": "./dist/index.js"
//// }

// @Filename: /packages/utils/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "nodenext",
////         "rootDir": "src",
////         "outDir": "dist"
////     },
////     "include": ["src"]
//// }

// @Filename: /packages/utils/src/index.ts
//// export function gainUtility() { return 0; }

// @Filename: /packages/web/package.json
//// {
////     "name": "web",
////     "version": "1.0.0",
////     "dependencies": {
////         "@monorepo/utils": "file:../utils"
////     }
//// }

// @Filename: /packages/web/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "esnext",
////         "moduleResolution": "bundler",
////         "rootDir": "src",
////         "outDir": "dist",
////         "emitDeclarationOnly": true
////     },
////     "include": ["src"],
////     "references": [
////         { "path": "../utils" }
////     ]
//// }

// @Filename: /packages/web/src/index.ts
//// gainUtility/**/

// @link: /packages/utils -> /node_modules/utils
// @link: /packages/utils -> /node_modules/@monorepo/utils
// @link: /packages/web -> /node_modules/web

goTo.marker("");
verify.importFixModuleSpecifiers("", ["@monorepo/utils"]);
