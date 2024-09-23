/// <reference path="../fourslash.ts" />

// @Filename: node_modules/dep/package.json
//// {
////     "name": "dep",
////     "version": "0.0.1",
////     "type": "module",
////     "exports": {
////         "import": "./dist/index.js",
////         "require": "./dist/index.cjs"
////     }
//// }

// @Filename: node_modules/dep/dist/index.d.ts
//// export type ModuleType = "ESM";

// @Filename: node_modules/dep/dist/index.d.cts
//// export type ModuleType = "CJS";

// @Filename: packages/lib/package.json
//// {
////     "name": "lib",
////     "version": "0.0.1",
////     "type": "module",
////     "exports": "./dist/index.js"
//// }

// @Filename: packages/lib/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "nodenext",
////         "outDir": "./dist",
////         "rootDir": "./src"
////     }
//// }

// @Filename: packages/lib/src/index.ts
//// import { ModuleType } from "dep";
//// export const moduleType: ModuleType = "ESM";

// @Filename: packages/app/package.json
//// { "type": "module" }

// @Filename: packages/app/tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "preserve"
////     },
////     "references": [
////         { "path": "../lib" }
////     ]
//// }

// @Filename: packages/app/src/index.ts
//// import { ModuleType } from "dep";
//// import { moduleType } from "lib";
//// const test: ModuleType = moduleType;

// @link: /tests/cases/fourslash/server/packages/lib -> /tests/cases/fourslash/server/packages/app/node_modules/lib

goTo.file("/tests/cases/fourslash/server/packages/app/src/index.ts");
verify.getSemanticDiagnostics([]);
