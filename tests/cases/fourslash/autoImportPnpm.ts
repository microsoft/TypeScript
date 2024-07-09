/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json
//// { "types": "dist/mobx.d.ts" }

// @Filename: /node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
//// export declare function autorun(): void;

// @Filename: /index.ts
//// autorun/**/

// @Filename: /utils.ts
//// import "mobx";

// @link: /node_modules/.pnpm/mobx@6.0.4/node_modules/mobx -> /node_modules/mobx
// @link: /node_modules/.pnpm/mobx@6.0.4/node_modules/mobx -> /node_modules/.pnpm/cool-mobx-dependent@1.2.3/node_modules/mobx

goTo.marker("");
verify.importFixAtPosition([`import { autorun } from "mobx";

autorun`]);
