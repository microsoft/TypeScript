/// <reference path='fourslash.ts' />

// Test that we leave it alone if the name is a keyword.

// @allowJs: true

// @Filename: /a.js
////exports.default = 0;
////exports.default;

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`const _default = 0;
export { _default as default };
_default;`,
});
