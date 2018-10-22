/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: test.js
////function wat(b) {
////    b();
////}

verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent:
`/**
 * @param {() => void} b
 */
function wat(b) {
    b();
}`});
