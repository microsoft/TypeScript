/// <reference path="../fourslash.ts" />

// @Filename: /alpha/tsconfig.json
//// { "compilerOptions": { "rootDir": "src", "outDir": "dist", "composite": true } }

// @Filename: /alpha/package.json
//// { "main": "dist/index.js" }

// @Filename: /alpha/src/index.ts
//// export class Alpha {}

// @Filename: /beta/tsconfig.json
//// {
////   "compilerOptions": { "moduleResolution": "node", "paths": { "@test/alpha": ["../alpha"] } },
////   "references": [{ "path": "../alpha" }]
//// }

// @Filename: /beta/src/index.ts
//// Alpha/**/

// @Filename: /beta/src/utils.ts
//// import "@test/alpha";


goTo.marker("");
verify.importFixAtPosition([`import { Alpha } from "@test/alpha";\r\n\r\nAlpha`]);
