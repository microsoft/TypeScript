// @strict: true
/// <reference path='fourslash.ts' />
//// function f(x: [|number?|]) {
//// }

verify.codeFix({
    description: "Change 'number?' to 'number | undefined'",
    errorCode: 17019,
    index: 0,
    newRangeContent: "number | undefined",
});
