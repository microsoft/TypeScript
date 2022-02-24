/// <reference path="fourslash.ts" />

// @Filename: file1.ts
//// export { /**/default };

goTo.marker();

verify.not.codeFixAllAvailable("fixMissingImport");
