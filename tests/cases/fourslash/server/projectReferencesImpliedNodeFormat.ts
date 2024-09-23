/// <reference path="../fourslash.ts" />

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
////         "module": "preserve",
////         "outDir": "./dist",
////         "rootDir": "./src"
////     }
//// }

// @Filename: packages/lib/src/index.ts
//// export {};

// @Filename: packages/app/tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "nodenext"
////     },
////     "references": [
////         { "path": "../lib" }
////     ]
//// }

// @Filename: packages/app/src/index.cts
//// import {} from [|"lib"|];

// @link: /tests/cases/fourslash/server/packages/lib -> /tests/cases/fourslash/server/packages/app/node_modules/lib

goTo.file("/tests/cases/fourslash/server/packages/app/src/index.cts");
verify.getSemanticDiagnostics([{
  code: 1479,
  message: `The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"lib\")' call instead.`,
}]);
