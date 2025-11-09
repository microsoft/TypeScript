/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext"
////   }
//// }

// @Filename: /home/src/workspaces/project/packages/app/dist/index.d.ts
//// import {} from "utils";
//// export const app: number;

// @Filename: /home/src/workspaces/project/packages/utils/package.json
//// { "name": "utils", "version": "1.0.0", "main": "dist/index.js" }

// @Filename: /home/src/workspaces/project/packages/utils/dist/index.d.ts
//// export const x: number;

// @link: /home/src/workspaces/project/packages/utils -> /home/src/workspaces/project/packages/app/node_modules/utils

// @Filename: /home/src/workspaces/project/script.ts
//// import {} from "./packages/app/dist/index.js";
//// x/**/

goTo.marker("");
verify.importFixModuleSpecifiers("", ["./packages/utils/dist/index.js"]);
