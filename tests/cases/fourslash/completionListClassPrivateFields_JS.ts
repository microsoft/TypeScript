/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js
////class A {
////    #private = 1;
////}
////
////class B extends A {
////    /**/
////}

verify.completions({
    marker: "",
    exact: [
        { name: "A", sortText: completion.SortText.JavascriptIdentifiers },
        { name: "B", sortText: completion.SortText.JavascriptIdentifiers },
        ...completion.classElementInJsKeywords
    ],
    isNewIdentifierLocation: true
});
