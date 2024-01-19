/// <reference path="../fourslash.ts"/>

// @module: commonjs

// @Filename: //tsclient/project/node_modules/aws-sdk/package.json
//// { "name": "aws-sdk", "version": "2.0.0", "main": "index.js" }

// @Filename: //tsclient/project/node_modules/aws-sdk/index.d.ts
//// export * from "./clients/s3";

// @Filename: //tsclient/project/node_modules/aws-sdk/clients/s3.d.ts
//// export declare class S3 {}

// @Filename: //tsclient/project/package.json
//// { "dependencies": { "aws-sdk": "*" } }

// @Filename: //tsclient/project/index.ts
//// S3/**/

const autoImportFileExcludePatterns = ["\\\\tsclient\\project\\node_modules\\aws-sdk"];

verify.completions({
  marker: "",
  excludes: "S3",
  preferences: {
    includeCompletionsForModuleExports: true,
    autoImportFileExcludePatterns,
  }
});

verify.importFixAtPosition([], /*errorCode*/ undefined, { autoImportFileExcludePatterns });
