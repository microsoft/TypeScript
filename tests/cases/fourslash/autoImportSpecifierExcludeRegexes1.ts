/// <reference path="fourslash.ts" />

// @module: preserve

// @Filename: /node_modules/lib/index.d.ts
//// declare module "ambient" {
////     export const x: number;
//// }
//// declare module "ambient/utils" {
////    export const x: number;
//// }

// @Filename: /index.ts
//// x/**/

verify.importFixModuleSpecifiers("", ["ambient", "ambient/utils"]);
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["utils"] });
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["/.*?$"]});
verify.importFixModuleSpecifiers("", ["ambient"], { autoImportSpecifierExcludeRegexes: ["^ambient/"] });
verify.importFixModuleSpecifiers("", ["ambient/utils"], { autoImportSpecifierExcludeRegexes: ["ambient$"] });
verify.importFixModuleSpecifiers("", ["ambient", "ambient/utils"], { autoImportSpecifierExcludeRegexes: ["oops("] });