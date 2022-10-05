// @strict: true
/// <reference path='fourslash.ts' />
//// var f = function f(x: [|string?|]) {
//// }

verify.codeFix({
    description: "Change 'string?' to 'string | undefined'",
    errorCode: 17019,
    index: 1,
    newRangeContent: "string | undefined",
});
