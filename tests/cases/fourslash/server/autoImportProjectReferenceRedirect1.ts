/// <reference path="../fourslash.ts" />

// @link: /packages/a -> /node_modules/a

// @Filename: /packages/a/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "composite": true, "outDir": "dist", "rootDir": "src" } }

// @Filename: /packages/a/package.json
//// { "name": "a", "main": "dist/index.js", "typings": "dist/index.d.ts" }

// @Filename: /packages/a/src/index.ts
//// import "./a";
//// export class Index {}

// @Filename: /packages/a/src/a.ts
//// export class A {}


// @Filename: /packages/b/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "outDir": "dist", "rootDir": "src" }, "references": [{ "path": "../a" }] }

// @Filename: /packages/b/src/util.ts
//// import { A } from "a";

// @Filename: /packages/b/src/index.ts
//// A/**/

goTo.marker("");
verify.importFixAtPosition([`import { A } from "a/src/a";\n\nA`]);
