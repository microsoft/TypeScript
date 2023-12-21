/// <reference path="../fourslash.ts"/>

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist"
////   }
//// }

// @Filename: /package.json
//// {
////   "type": "module",
////   "imports": {
////     "#internal/*": "./dist/internal/*"
////   }
//// }

// @Filename: /src/internal/foo.ts
//// export function something(name: string) {}

// @Filename: /src/a.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["#internal/foo.js"]);