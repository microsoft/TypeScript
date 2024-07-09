/// <reference path="fourslash.ts" />

////function a() {
////    ty/**/
////}

verify.completions({
    marker: "",
    includes: [{ name: "type", sortText: completion.SortText.GlobalsOrKeywords }]
});
