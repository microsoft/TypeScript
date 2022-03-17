/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "nodenext" } }

// @Filename: /package.json
//// { "type": "module" }

// @Filename: /mobx.d.cts
//// export declare function autorun(): void;

// @Filename: /index.ts
//// autorun/**/

// @Filename: /utils.ts
//// import "./mobx.cjs";

goTo.marker("");
verify.importFixAtPosition([`import { autorun } from "./mobx.cjs";

autorun`]);
