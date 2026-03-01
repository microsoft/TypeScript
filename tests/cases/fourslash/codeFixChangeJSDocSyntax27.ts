// @strict: true
/// <reference path='fourslash.ts' />
//// function f(x: [|never?|]) {
//// }

verify.codeFix({
    description: "Change 'never?' to 'never'",
    errorCode: 17019,
    index: 0,
    newRangeContent: "never",
});
