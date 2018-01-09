// @strict: true
/// <reference path='fourslash.ts' />
//// var f = function f(x: [|string?|]) {
//// }

verify.codeFix({
    description: "Change 'string?' to 'string | null | undefined'",
    errorCode: 8020,
    index: 1,
    newRangeContent: "string | null | undefined",
});
