/// <reference path="../fourslash.ts"/>

// @module: commonjs

// @Filename: /project/node_modules/.store/@remix-run-server-runtime-virtual-c72daf0d/package/package.json
//// {
////   "name": "@remix-run/server-runtime",
////   "version": "0.0.0",
////   "main": "index.js"
//// }

// @Filename: /project/node_modules/.store/@remix-run-server-runtime-virtual-c72daf0d/package/index.d.ts
//// export declare function ServerRuntimeMetaFunction(): void;

// @Filename: /project/package.json
//// { "dependencies": { "@remix-run/server-runtime": "*" } }

// @link: /project/node_modules/.store/@remix-run-server-runtime-virtual-c72daf0d/package -> /project/node_modules/@remix-run/server-runtime

// @Filename: /project/index.ts
//// ServerRuntimeMetaFunction/**/

const autoImportFileExcludePatterns = ["/**/@remix-run/server-runtime"];

verify.completions({
  marker: "",
  excludes: "ServerRuntimeMetaFunction",
  preferences: {
    includeCompletionsForModuleExports: true,
    autoImportFileExcludePatterns,
  }
});

verify.importFixAtPosition([], /*errorCode*/ undefined, { autoImportFileExcludePatterns });
