/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "preserve"
////   }
//// }

// @Filename: /home/src/workspaces/project/types.d.ts
//// declare module "mymod" {
////   import mymod from "mymod";
////   export default mymod;
//// }

// @Filename: /home/src/workspaces/project/index.ts
//// my/**/

verify.importFixModuleSpecifiers("", []);
