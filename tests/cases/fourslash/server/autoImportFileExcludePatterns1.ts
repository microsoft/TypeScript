/// <reference path="../fourslash.ts"/>

// @module: commonjs

// @Filename: /home/src/workspaces/project/node_modules/aws-sdk/package.json
//// { "name": "aws-sdk", "version": "2.0.0", "main": "index.js" }

// @Filename: /home/src/workspaces/project/node_modules/aws-sdk/index.d.ts
//// export * from "./clients/s3";

// @Filename: /home/src/workspaces/project/node_modules/aws-sdk/clients/s3.d.ts
//// export declare class S3 {}

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "aws-sdk": "*" } }

// @Filename: /home/src/workspaces/project/index.ts
//// S3/**/

const autoImportFileExcludePatterns = ["/**/node_modules/aws-sdk"];

verify.completions({
  marker: "",
  excludes: "S3",
  preferences: {
    includeCompletionsForModuleExports: true,
    autoImportFileExcludePatterns,
  }
});

verify.importFixAtPosition([], /*errorCode*/ undefined, { autoImportFileExcludePatterns });
