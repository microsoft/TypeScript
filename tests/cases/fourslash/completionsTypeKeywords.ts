/// <reference path="fourslash.ts" />

// @noLib: true

////type T = /**/

verify.completions({
    marker: "",
    exact: completion.typeKeywordsPlus(["T", completion.globalThisEntry]),
});
