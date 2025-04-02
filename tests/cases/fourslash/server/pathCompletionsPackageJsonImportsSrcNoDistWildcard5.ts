/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext",
////     "rootDir": "src",
////     "outDir": "dist/esm",
////     "declarationDir": "dist/types"
////   }
//// }

// @Filename: /home/src/workspaces/project/package.json
//// {
////   "name": "foo",
////   "main": "dist/index.js",
////   "module": "dist/index.mjs",
////   "types": "dist/index.d.ts",
////   "imports": {
////     "#*": {
////       "import": {
////         "types": "./dist/types/*.d.mts",
////         "default": "./dist/esm/*.mjs"
////       },
////       "default": {
////         "types": "./dist/types/*.d.ts",
////         "default": "./dist/cjs/*.js"
////       }
////     },
////     "#only-in-cjs": {
////       "require": {
////         "types": "./dist/types/only-in-cjs/index.d.ts",
////         "default": "./dist/cjs/only-in-cjs/index.js"
////       }
////     }
////   }
//// }

// @Filename: /home/src/workspaces/project/src/index.mts
//// export const index = 0;

// @Filename: /home/src/workspaces/project/src/index.ts
//// export const index = 0;

// @Filename: /home/src/workspaces/project/src/blah.mts
//// export const blah = 0;

// @Filename: /home/src/workspaces/project/src/blah.ts
//// export const blah = 0;

// @Filename: /home/src/workspaces/project/src/only-in-cjs/index.ts
//// export const onlyInCjs = 0;

// @Filename: /home/src/workspaces/project/src/index.mts
//// import { } from "/**/";

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  exact: [
    { name: "#blah", kind: "script", kindModifiers: "" },
    { name: "#index", kind: "script", kindModifiers: "" },
  ]
});
