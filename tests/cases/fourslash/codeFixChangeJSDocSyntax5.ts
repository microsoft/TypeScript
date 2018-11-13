// @strict: true
/// <reference path='fourslash.ts' />
//// var x: [|?number|] = 12;

verify.codeFix({
    description: "Change '?number' to 'number | null'",
    errorCode: 8020,
    index: 0,
    newRangeContent: "number | null",
});
