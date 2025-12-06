/// <reference path="../fourslash.ts" />

// @Filename: src/tsconfig-base.json
//// {
////     "compilerOptions": {
////         "module": "nodenext",
////         "composite": true,
////         "rewriteRelativeImportExtensions": true,
////     }
//// }

// @Filename: src/libs/utils/tsconfig.json
//// {
////     "extends": "../../tsconfig-base.json",
////     "compilerOptions": {
////         "rootDir": ".",
////         "outDir": "../../../dist/libs",
////     }
//// }

// @Filename: src/libs/utils/helper.ts
//// export function helper() { return 42; }

// @Filename: src/apps/main/tsconfig.json
//// {
////     "extends": "../../tsconfig-base.json",
////     "compilerOptions": {
////         "rootDir": ".",
////         "outDir": "../../../dist/apps",
////     },
////     "references": [
////         { "path": "../../libs/utils" }
////     ]
//// }

// @Filename: src/apps/main/index.ts
//// import { helper } from "../../libs/utils/helper.ts";

goTo.file("/tests/cases/fourslash/server/src/apps/main/index.ts");
verify.baselineSyntacticAndSemanticDiagnostics();