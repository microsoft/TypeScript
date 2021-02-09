/// <reference path='fourslash.ts' />

//// type Bar<T> = T extends { a: (x: in/**/) => void }
////    ? U
////    : never;

verify.completions({
    marker: "",
    includes: [{ name: "infer", kind: "keyword", sortText: completion.SortText.GlobalsOrKeywords }]
});
