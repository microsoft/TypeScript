/// <reference path="fourslash.ts" />

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "paths": {
////             "@root/*": ["${configDir}/src/*"]
////         }
////     }
//// }

// @Filename: src/one.ts
//// export const one = 1;

// @Filename: src/foo/two.ts
//// one/**/

verify.importFixModuleSpecifiers("", ["@root/one"]);
