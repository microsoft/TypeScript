/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /package.json
//// { "dependencies": { "mobx": "*" } }

// @Filename: /node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json
//// { "types": "dist/mobx.d.ts" }

// @Filename: /node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
//// export declare function autorun(): void;

// @Filename: /index.ts
//// autorun/**/

// @link: /node_modules/.pnpm/mobx@6.0.4/node_modules/mobx -> /node_modules/mobx

goTo.marker("");
verify.importFixAtPosition([`import { autorun } from "mobx";\r\n\r\nautorun`]);
