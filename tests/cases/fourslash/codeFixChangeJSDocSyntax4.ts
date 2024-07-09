/// <reference path='fourslash.ts' />
//// var x: [|Array.<number>|] = 12;

verify.codeFix({
    description: "Change 'Array.<number>' to 'number[]'",
    newRangeContent: "number[]",
});
