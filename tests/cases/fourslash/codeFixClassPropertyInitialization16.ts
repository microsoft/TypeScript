/// <reference path='fourslash.ts' />

// @strict: true
// @checkJs: true
// @allowJs: true
// @filename: a.js
////class Foo {
////    /**
////     * @type {string}
////     */
////    a;
////}

verify.codeFix({
    description: `Add 'undefined' type to property 'a'`,
    newFileContent:
`class Foo {
    /**
     * @type {string | undefined}
     */
    a;
}`,
    index: 2
})
