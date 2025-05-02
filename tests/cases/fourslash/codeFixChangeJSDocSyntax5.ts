// @strict: true
/// <reference path='fourslash.ts' />
//// var x: [|?number|] = 12;

verify.codeFix({
    description: "Change '?number' to 'number | null | undefined'",
    errorCode: 17020,
    index: 0,
    newRangeContent: "number | null | undefined",
});
