/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: false
// @Filename: index.js
////function hello() {
////
////}
////
////const goodbye = 5;
////
////console./*0*/

verify.completions({
    marker: "0",
    includes: [
        {
            name: "hello",
            sortText: completion.SortText.JavascriptIdentifiers,
            isFromUncheckedFile: true
        },
        {
            name: "goodbye",
            sortText: completion.SortText.JavascriptIdentifiers,
            isFromUncheckedFile: true
        }
    ]
});