/// <reference path="fourslash.ts" />

////export type A = typ/**/

verify.completions({
    marker: "",
    includes: [{ name: "typeof", sortText: completion.SortText.GlobalsOrKeywords }]
});
