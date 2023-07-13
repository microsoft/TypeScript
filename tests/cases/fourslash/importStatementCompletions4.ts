/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
////import Foo /*a*/
////
////function fromBar() {}

// @Filename: /b.jsx
////import Foo /*b*/
////
////function fromBar() {}

verify.completions({
    marker: ["a", "b"],
    exact: {
        name: "from",
        sortText: completion.SortText.GlobalsOrKeywords,
    },
    preferences: {
        includeCompletionsForImportStatements: true,
        includeInsertTextCompletions: true,
    },
});
