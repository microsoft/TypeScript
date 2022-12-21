/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: false

// @filename: /foo.js
////const foo = [x => x + 1];

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 0,
    newFileContent: `const foo = [(/** @type {number} */ x) => x + 1];`
});
