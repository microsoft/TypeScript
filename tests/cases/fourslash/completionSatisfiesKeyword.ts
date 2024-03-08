/// <reference path="fourslash.ts" />

////const x = { a: 1 } /*1*/
////function foo() {
////    const x = { a: 1 } /*2*/
////}

verify.completions({
    marker: ["1", "2"],
    includes: [{ name: "satisfies", sortText: completion.SortText.GlobalsOrKeywords }]
});
