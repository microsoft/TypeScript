/// <reference path="../fourslash.ts"/>

// @Filename: /a/b/c/d/e/tsconfig.json
//// { "compilerOptions": { "module": "nodenext" } }

// @Filename: /a/b/c/d/e/package.json
//// {
////   "name": "app",
////   "imports": {
////     "#utils": "lodash"
////   }
//// }

// @Filename: /a/b/node_modules/lodash/index.d.ts
//// export function add(a: number, b: number): number;

// @Filename: /a/b/c/d/e/index.ts
//// import { add } from "#utils";

goTo.file("/a/b/c/d/e/index.ts");
