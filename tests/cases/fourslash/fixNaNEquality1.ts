/// <reference path="fourslash.ts" />

////declare const x: number;
////[|if (x === NaN) {}|]

verify.codeFix({
    index: 0,
    description: "Use `Number.isNaN(x)`.",
    newRangeContent: "if (Number.isNaN(x)) {}",
});
