/// <reference path='fourslash.ts' />

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////const exportsAlias = exports;
////exportsAlias.f = function() {};
////module.exports = exportsAlias;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent: `
export function f() {}
`,
});
