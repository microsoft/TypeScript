/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////require("foo");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: 'import "foo";',
});
