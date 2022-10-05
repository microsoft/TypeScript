// @strict: true
/// <reference path='fourslash.ts' />
//// var x = 12 as [|number?|];

verify.codeFix({
    description: "Change 'number?' to 'number | undefined'",
    errorCode: 17019,
    index: 0,
    newRangeContent: "number | undefined",
});
