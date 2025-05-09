/// <reference path="../fourslash.ts"/>

// @module: commonjs

// @Filename: c:/workspaces/project/node_modules/.store/aws-sdk-virtual-adfe098/package/package.json
//// { "name": "aws-sdk", "version": "2.0.0", "main": "index.js" }

// @Filename: c:/workspaces/project/node_modules/.store/aws-sdk-virtual-adfe098/package/index.d.ts
//// export {};

// @Filename: c:/workspaces/project/node_modules/@remix-run/server-runtime/package.json
//// {
////   "name": "@remix-run/server-runtime",
////   "version": "0.0.0",
////   "main": "index.js"
//// }

// @Filename: c:/workspaces/project/node_modules/@remix-run/server-runtime/index.d.ts
//// export declare function ServerRuntimeMetaFunction(): void;

// @Filename: c:/workspaces/project/package.json
//// { "dependencies": { "aws-sdk": "*", "@remix-run/server-runtime": "*" } }

// @link: c:/workspaces/project/node_modules/.store/aws-sdk-virtual-adfe098/package -> c:/workspaces/project/node_modules/aws-sdk

// @Filename: c:/workspaces/project/index.ts
//// ServerRuntimeMetaFunction/**/

const autoImportFileExcludePatterns = ["c:/**/@remix-run/server-runtime"];

verify.completions({
  marker: "",
  excludes: "ServerRuntimeMetaFunction",
  preferences: {
    includeCompletionsForModuleExports: true,
    autoImportFileExcludePatterns,
  }
});

verify.importFixAtPosition([], /*errorCode*/ undefined, { autoImportFileExcludePatterns });
