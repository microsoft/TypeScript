/// <reference path="fourslash.ts" />

////declare const x: number;
////[|if (NaN === x) {}|]

verify.codeFix({
    index: 0,
    description: "Use `Number.isNaN(x)`.",
    newRangeContent: "if (Number.isNaN(x)) {}",
});
