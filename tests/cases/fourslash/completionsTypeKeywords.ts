/// <reference path="fourslash.ts" />

// @noLib: true

////type T = /**/

verify.completions({
    marker: "",
    exact: [completion.globalThisEntry, "T", ...completion.typeKeywords],
});
