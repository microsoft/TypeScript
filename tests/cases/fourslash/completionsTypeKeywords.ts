/// <reference path="fourslash.ts" />

// @noLib: true

////type T = /**/

verify.completions({
    marker: "",
    exact: ["T", "globalThis", ...completion.typeKeywords],
});
