/// <reference path="../fourslash.ts" />

// @Filename: src/tsconfig-base.json
//// {
////     "compilerOptions": {
////         "module": "nodenext",
////         "composite": true,
////         "rootDir": ".",
////         "outDir": "../dist",
////         "rewriteRelativeImportExtensions": true,
////     }
//// }

// @Filename: src/compiler/tsconfig.json
//// {
////     "extends": "../tsconfig-base.json",
////     "compilerOptions": {}
//// }

// @Filename: src/compiler/parser.ts
//// export {};

// @Filename: src/services/tsconfig.json
//// {
////     "extends": "../tsconfig-base.json",
////     "compilerOptions": {},
////     "references": [
////         { "path": "../compiler" }
////     ]
//// }

// @Filename: src/services/services.ts
//// import {} from "../compiler/parser.ts";

goTo.file("/tests/cases/fourslash/server/src/services/services.ts");
verify.baselineSyntacticAndSemanticDiagnostics();
