/// <reference path="fourslash.ts" />

// @lib: dom
// @allowJs: true

// @Filename: globals.d.ts
/////** @deprecated foo */
////declare var foo: string;

// @Filename: index.ts
////class Foo {
////    foo: number;
////    m() {
////        foo/**/
////    }
////}

verify.completions({
    marker: "",
    includes: [{
        name: "foo",
        kind: "var",
        kindModifiers: "deprecated,declare",
        sortText: completion.SortText.Deprecated(completion.SortText.GlobalsOrKeywords),
    }]
}, {
    preferences: {
        includeInsertTextCompletions: true
    }
});
