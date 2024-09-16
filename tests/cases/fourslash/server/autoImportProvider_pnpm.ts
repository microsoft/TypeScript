/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs" } }

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "mobx": "*" } }

// @Filename: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/package.json
//// { "types": "dist/mobx.d.ts" }

// @Filename: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx/dist/mobx.d.ts
//// export declare function autorun(): void;

// @Filename: /home/src/workspaces/project/index.ts
//// autorun/**/

// @link: /home/src/workspaces/project/node_modules/.pnpm/mobx@6.0.4/node_modules/mobx -> /home/src/workspaces/project/node_modules/mobx

goTo.marker("");
verify.importFixAtPosition([`import { autorun } from "mobx";\r\n\r\nautorun`]);
