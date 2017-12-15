// @strict: true
/// <reference path='fourslash.ts' />
//// var x: [|number?|] = 12;

verify.codeFix({
    description: "Change 'number?' to 'number | null | undefined'",
    index: 1,
    newRangeContent: "number | null | undefined",
});
