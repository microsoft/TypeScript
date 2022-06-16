/// <reference path="fourslash.ts"/>

// @module: commonjs

// @Filename: /project/node_modules/aws-sdk/clients/s3.d.ts
//// export declare class S3 {}

// @Filename: /project/index.ts
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
