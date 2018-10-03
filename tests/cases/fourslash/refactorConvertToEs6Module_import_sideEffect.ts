/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true

// @Filename: /a.js
/////*a*/require/*b*/("foo");

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent: 'import "foo";',
});
