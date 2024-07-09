/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////exports.class = 0;
////exports.async = 1;

verify.codeFix({
    description: "Convert to ES module",
    newFileContent:
`const _class = 0;
export { _class as class };
export const async = 1;`,
});
