/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: false

// @filename: /foo.js
////function foo(names) {
////    return names.filter(function (name, index) {
////        return name === "foo" && index === 1;
////    });
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 1,
    newFileContent:
`function foo(names) {
    return names.filter(function (/** @type {string} */ name, /** @type {number} */ index) {
        return name === "foo" && index === 1;
    });
}`
});
