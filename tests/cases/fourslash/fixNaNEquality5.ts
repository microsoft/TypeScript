/// <reference path="fourslash.ts" />

////declare const x: any;
////[|if (NaN !== x[0][1]) {}|]

verify.codeFix({
    index: 0,
    description: "Use `!Number.isNaN(...)`.",
    newRangeContent: "if (!Number.isNaN(x[0][1])) {}",
});
