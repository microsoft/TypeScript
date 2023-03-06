/// <reference path="fourslash.ts"/>

// @noLib: true

/////**/

verify.completions({
    marker: "",
    exact: completion.globalsPlus([], { noLib: true }),
});
