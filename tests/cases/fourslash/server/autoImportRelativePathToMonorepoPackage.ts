/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "nodenext"
////   }
//// }

// @Filename: /packages/app/dist/index.d.ts
//// import {} from "utils";
//// export const app: number;

// @Filename: /packages/utils/package.json
//// { "name": "utils", "version": "1.0.0", "main": "dist/index.js" }

// @Filename: /packages/utils/dist/index.d.ts
//// export const x: number;

// @link: /packages/utils -> /packages/app/node_modules/utils

// @Filename: /script.ts
//// import {} from "./packages/app/dist/index.js";
//// x/**/

goTo.marker("");
verify.importFixModuleSpecifiers("", ["./packages/utils/dist/index.js"]);
