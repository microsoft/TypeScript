/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: false

// @filename: /foo.js
////function foo(names) {
////    return names.filter(name => name === "foo");
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 1,
    newFileContent:
`function foo(names) {
    return names.filter((/** @type {string} */ name) => name === "foo");
}`
});
