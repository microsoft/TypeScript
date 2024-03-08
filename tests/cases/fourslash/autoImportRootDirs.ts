/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "commonjs",
////         "rootDirs": [".", "./some/other/root"]
////     }
//// }

// @Filename: /some/other/root/types.ts
//// export type Something = {};

// @Filename: /index.ts
//// const s: Something/**/

verify.importFixModuleSpecifiers("", ["./types"]);
