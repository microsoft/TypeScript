/// <reference path="../fourslash.ts" />

// @Filename: /packages/a/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "composite": true, "outDir": "dist", "rootDir": "src" } }

// @Filename: /packages/a/src/index.ts
//// import "./a";
//// export class Index {}

// @Filename: /packages/a/src/a.ts
//// export class A {}

// @Filename: /packages/b/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs",
////     "outDir": "dist",
////     "rootDir": "src",
////     "baseUrl": ".",
////     "paths": {
////       "a": ["../a/src/index"],
////       "a/*": ["../a/*"]
////     }
////   },
////   "references": [{ "path": "../a" }]
//// }

// @Filename: /packages/b/src/util.ts
//// import {} from "a";

// @Filename: /packages/b/src/index.ts
//// A/**/

goTo.marker("");
verify.importFixAtPosition([`import { A } from "a/src/a";\r\n\r\nA`]);
