/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////exports.x = 0;

// @Filename: /b.js
////export const y = 0;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent: "export const x = 0;",
});
