/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "allowImportingTsExtensions": true,
////     "rootDir": "src",
////     "outDir": "dist",
////     "declarationDir": "types",
////     "declaration": true
////   }
//// }

// @Filename: /package.json
//// {
////   "name": "self",
////   "type": "module",
////   "imports": {
////     "#*": {
////       "types": "./types/*",
////       "default": "./dist/*"
////     }
////   }
//// }

// @Filename: /src/add.ts
//// export function add(a: number, b: number) {}

// @Filename: /src/index.ts
//// add/*imports*/;
//// external/*exports*/;

verify.importFixModuleSpecifiers("imports", ["#add.js"]);
