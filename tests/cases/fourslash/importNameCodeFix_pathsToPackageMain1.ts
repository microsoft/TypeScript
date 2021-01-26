/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "moduleResolution": "node", "paths": { "@test/alpha": ["alpha"] } } }

// @Filename: /alpha/package.json
//// { "main": "src/index.ts" }

// @Filename: /alpha/src/index.ts
//// export class Alpha {}

// @Filename: /beta/src/index.ts
//// Alpha/**/

goTo.marker("");
verify.importFixAtPosition([`import { Alpha } from "@test/alpha";

Alpha`]);
