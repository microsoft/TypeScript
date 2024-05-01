/// <reference path="fourslash.ts" />

// @noLib: true

////type T = /**/

verify.completions({
    marker: "",
    exact: completion.globalTypesPlus(["T"], { noLib: true }),
});
