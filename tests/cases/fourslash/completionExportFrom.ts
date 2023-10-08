/// <reference path="fourslash.ts" />

//// export * /**/;

verify.completions({
    marker: [""],
    includes: [{
        name: "from",
        sortText: completion.SortText.GlobalsOrKeywords,
    }],
});
