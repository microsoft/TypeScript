/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext
// @module: node18

// @Filename: /a.js
////module.exports = 0;

// @Filename: /b.ts
////module.exports = 0;

// @Filename: /c.cjs
////module.exports = 0;

// @Filename: /d.cts
////module.exports = 0;

goTo.file("/a.js");
verify.codeFixAvailable([]);

goTo.file("/b.ts");
verify.codeFixAvailable([]);

goTo.file("/c.cjs");
verify.codeFixAvailable([]);

goTo.file("/d.cts");
verify.codeFixAvailable([]);