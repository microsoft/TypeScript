// @strict: true
/// <reference path='fourslash.ts' />
////type T = [|...number?|];

verify.codeFix({
    description: "Change '...number?' to '(number | null)[]'.",
    newRangeContent: "(number | null)[]",
});
