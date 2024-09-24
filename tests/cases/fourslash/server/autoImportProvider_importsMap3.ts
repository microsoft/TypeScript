/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist"
////   }
//// }

// @Filename: /home/src/workspaces/project/package.json
//// {
////   "type": "module",
////   "imports": {
////     "#internal/": "./dist/internal/"
////   }
//// }

// @Filename: /home/src/workspaces/project/src/internal/foo.ts
//// export function something(name: string) {}

// @Filename: /home/src/workspaces/project/src/a.ts
//// something/**/

verify.importFixModuleSpecifiers("", ["#internal/foo.js"]);