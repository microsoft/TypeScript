// @strict: true
/// <reference path='fourslash.ts' />
//// var x = 12 as [|number?|];

verify.codeFix({
    description: "Change 'number?' to 'number | null'",
    errorCode: 8020,
    index: 0,
    newRangeContent: "number | null",
});
