/// <reference path="fourslash.ts" />

//// export * /*1*/;
//// export {} /*2*/;

verify.completions({
    marker: ["1", "2"],
    includes: [{
        name: "from",
        sortText: completion.SortText.GlobalsOrKeywords,
    }],
});
