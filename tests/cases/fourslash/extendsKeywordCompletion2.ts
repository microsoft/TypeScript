/// <reference path="fourslash.ts" />

////function f1<T /*1*/>() {}
////function f2<T ext/*2*/>() {}

verify.completions({
    marker: ["1", "2"],
    includes: [{ name: "extends", sortText: completion.SortText.GlobalsOrKeywords }]
});
