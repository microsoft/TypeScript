/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitThis: true

// @Filename: /a.js
/////** Doc */
////function f() {
////    this.x = 1;
////}

verify.codeFix({
    description: "Add '@class' tag",
    index: 0,
    newFileContent:
`/**
 * @class
 * Doc */
function f() {
    this.x = 1;
}`,
});
