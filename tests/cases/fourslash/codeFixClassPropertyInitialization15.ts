/// <reference path='fourslash.ts' />

// @strict: true
// @checkJs: true
// @allowJs: true
// @filename: a.js
////class Foo {
////    /**
////     * comment
////     * @type {string}
////     */
////    a;
////}

verify.codeFix({
    description: `Add 'undefined' type to property 'a'`,
    newFileContent:
`class Foo {
    /**
     * comment
     * @type {string | undefined}
     */
    a;
}`,
    index: 2
})
