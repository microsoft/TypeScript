/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.cjs
////module.exports = 0;

// @Filename: /b.cts
////module.exports = 0;

// @Filename: /c.ts
////module.exports = 0;

// @Filename: /d.js
////module.exports = 0;

goTo.file("/a.cjs");
verify.codeFixAvailable([]);

goTo.file("/b.cts");
verify.codeFixAvailable([]);

goTo.file("/c.ts");
verify.codeFixAvailable([]);

goTo.file("/d.js");
verify.codeFix({
    description: "Convert to ES module",
    newFileContent: 'export default 0;',
});