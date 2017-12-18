/// <reference path='fourslash.ts' />
//// var x: [|!number|] = 12;

verify.codeFix({
    description: "Change '!number' to 'number'",
    newRangeContent: "number",
});
