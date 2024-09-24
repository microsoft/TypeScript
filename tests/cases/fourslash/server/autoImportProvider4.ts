/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a/package.json
//// { "dependencies": { "b": "*" } }

// @Filename: /home/src/workspaces/project/a/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "target": "esnext" }, "references": [{ "path": "../b" }] }

// @Filename: /home/src/workspaces/project/a/index.ts
//// new Shape/**/

// @Filename: /home/src/workspaces/project/b/package.json
//// { "types": "out/index.d.ts" }

// @Filename: /home/src/workspaces/project/b/tsconfig.json
//// { "compilerOptions": { "outDir": "out", "composite": true } }

// @Filename: /home/src/workspaces/project/b/index.ts
//// export class Shape {}

// @link: /home/src/workspaces/project/b -> /home/src/workspaces/project/a/node_modules/b

goTo.marker();
verify.importFixAtPosition([`import { Shape } from "b";\r\n\r\nnew Shape`]);
