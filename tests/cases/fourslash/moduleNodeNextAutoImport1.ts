/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "nodenext" } }

// @Filename: /package.json
//// { "type": "module" }

// @Filename: /mobx.d.ts
//// export declare function autorun(): void;

// @Filename: /index.ts
//// autorun/**/

// @Filename: /utils.ts
//// import "./mobx.js";

goTo.marker("");
verify.importFixAtPosition([`import { autorun } from "./mobx.js";

autorun`]);
