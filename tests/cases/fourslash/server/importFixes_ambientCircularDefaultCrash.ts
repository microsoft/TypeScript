/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "preserve"
////   }
//// }

// @Filename: /types.d.ts
//// declare module "mymod" {
////   import mymod from "mymod";
////   export default mymod;
//// }

// @Filename: /index.ts
//// my/**/

verify.importFixModuleSpecifiers("", []);
