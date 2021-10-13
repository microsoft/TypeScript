/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.cjs
////module.exports = 0;

// @Filename: /b.cts
////module.exports = 0;

// @Filename: /c.js
////module.exports = 0;

// @Filename: /d.ts
////module.exports = 0;

goTo.file("/a.cjs");
verify.codeFixAvailable([]);

goTo.file("/b.cts");
verify.codeFixAvailable([]);

goTo.file("/c.js");
verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: 'export default 0;',
});

goTo.file("/d.ts");
verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: 'export default 0;',
});