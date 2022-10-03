/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: false

// @filename: /foo.js
////function foo(names) {
////    return names.filter(function (name) {
////        return name === "foo";
////    });
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 1,
    newFileContent:
`function foo(names) {
    return names.filter(function (/** @type {string} */ name) {
        return name === "foo";
    });
}`
});
