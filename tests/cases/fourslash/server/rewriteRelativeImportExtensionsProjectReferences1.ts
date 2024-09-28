/// <reference path="../fourslash.ts" />

// @Filename: packages/common/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "rootDir": "src",
////         "outDir": "dist",
////         "module": "nodenext",
////     }
//// }

// @Filename: packages/common/package.json
//// {
////     "name": "common",
////     "version": "1.0.0",
////     "type": "module",
////     "exports": {
////         ".": {
////             "source": "./src/index.ts",
////             "default": "./dist/index.js"
////         }
////     }
//// }

// @Filename: packages/common/src/index.ts
//// export {};

// @Filename: packages/main/tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "nodenext",
////         "rewriteRelativeImportExtensions": true,
////         "rootDir": "src",
////         "outDir": "dist",
////     },
////     "references": [
////         { "path": "../common" }
////     ]
//// }

// @Filename: packages/main/package.json
//// { "type": "module" }

// @Filename: packages/main/src/index.ts
//// import {} from "../../common/src/index.ts";

goTo.file("/tests/cases/fourslash/server/packages/main/src/index.ts");
verify.baselineSyntacticAndSemanticDiagnostics();
