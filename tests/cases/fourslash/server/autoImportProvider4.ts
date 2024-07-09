/// <reference path="../fourslash.ts" />

// @Filename: /a/package.json
//// { "dependencies": { "b": "*" } }

// @Filename: /a/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "target": "esnext" }, "references": [{ "path": "../b" }] }

// @Filename: /a/index.ts
//// new Shape/**/

// @Filename: /b/package.json
//// { "types": "out/index.d.ts" }

// @Filename: /b/tsconfig.json
//// { "compilerOptions": { "outDir": "out", "composite": true } }

// @Filename: /b/index.ts
//// export class Shape {}

// @link: /b -> /a/node_modules/b

goTo.marker();
verify.importFixAtPosition([`import { Shape } from "b";\r\n\r\nnew Shape`]);
