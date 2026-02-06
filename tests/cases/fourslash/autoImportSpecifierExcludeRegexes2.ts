/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "preserve",
////         "paths": {
////             "@app/*": ["./src/*"]
////         }
////     }
//// }

// @Filename: /src/utils.ts
//// export function add(a: number, b: number) {}

// @Filename: /src/index.ts
//// add/**/

verify.importFixModuleSpecifiers("", ["./utils"]);
verify.importFixModuleSpecifiers("", ["@app/utils"], { autoImportSpecifierExcludeRegexes: ["^\\./"] });

verify.importFixModuleSpecifiers("", ["@app/utils"], { importModuleSpecifierPreference: "non-relative" });
verify.importFixModuleSpecifiers("", ["./utils"], { importModuleSpecifierPreference: "non-relative", autoImportSpecifierExcludeRegexes: ["^@app/"] });

verify.importFixModuleSpecifiers("", [], { autoImportSpecifierExcludeRegexes: ["utils"] });
