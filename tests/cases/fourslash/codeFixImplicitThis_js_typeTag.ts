/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitThis: true

// @Filename: /a.js
////function f() {
////    this;
////}

verify.codeFix({
    description: "Add '@this' tag",
    index: 0,
    newFileContent:
`/** @this {any} */
function f() {
    this;
}`,
});
