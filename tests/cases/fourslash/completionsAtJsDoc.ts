/// <reference path="fourslash.ts" />

////interface Foo<T> { }
/////**
//// * @type {Foo<{/**/}>}
//// */

verify.completions({
    marker: "",
    exact: {
        name: "readonly",
        sortText: completion.SortText.GlobalsOrKeywords
    },
    isNewIdentifierLocation: true,
});
