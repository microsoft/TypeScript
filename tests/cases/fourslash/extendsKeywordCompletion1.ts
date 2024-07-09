/// <reference path="fourslash.ts" />

////export interface B ex/**/

verify.completions({
    marker: "",
    includes: [{ name: "extends", sortText: completion.SortText.GlobalsOrKeywords }]
});
