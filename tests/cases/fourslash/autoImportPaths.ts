/// <reference path="fourslash.ts" />

// @Filename: /package1/jsconfig.json
//// {
////   "compilerOptions": {
////     checkJs: true,
////     "paths": {
////       "package1/*": ["./*"],
////       "package2/*": ["../package2/*"]
////     },
////     "baseUrl": "."
////   },
////   "include": [
////     ".",
////     "../package2"
////   ]
//// }

// @Filename: /package1/file1.js
//// bar/**/

// @Filename: /package2/file1.js
//// export const bar = 0;

verify.importFixModuleSpecifiers("", ["package2/file1"], { importModuleSpecifierPreference: "shortest" });
