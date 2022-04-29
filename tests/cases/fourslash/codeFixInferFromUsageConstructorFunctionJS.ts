/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: test.js
////function TokenType([|label, token |]) {
////    this.label = label;
////    this.token = token || "N/A";
////};
////new TokenType("HI")

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 0,
    newFileContent:

`/**
 * @param {string} label
 * @param {string} [token]
 */
function TokenType(label, token ) {
    this.label = label;
    this.token = token || "N/A";
};
new TokenType("HI")`,
});


