/// <reference path="fourslash.ts" />

////const x = this /*1*/
////function foo() {
////    const x = this /*2*/
////}

verify.completions({
    marker: ["1", "2"],
    includes: [{ name: "as", sortText: completion.SortText.GlobalsOrKeywords }]
});
