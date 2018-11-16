/// <reference path='fourslash.ts' />

// TODO: Maybe we could transform this to `export function f() {}`.

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////function f() {}
////module.exports = { f };

verify.codeFix({
    description: "Convert to ES6 module",
    newFileContent:
`function f() {}
export default { f };`,
});
