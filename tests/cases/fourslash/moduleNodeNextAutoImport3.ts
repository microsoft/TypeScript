/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "nodenext" } }

// @Filename: /package.json
//// { "type": "module" }

// @Filename: /mobx.d.mts
//// export declare function autorun(): void;

// @Filename: /index.ts
//// autorun/**/

// @Filename: /utils.ts
//// import "./mobx.mjs";

goTo.marker("");
verify.importFixAtPosition([`import { autorun } from "./mobx.mjs";

autorun`]);
