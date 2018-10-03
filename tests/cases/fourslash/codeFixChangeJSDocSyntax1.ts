/// <reference path='fourslash.ts' />
//// var x: [|?|] = 12;

verify.codeFix({
    description: "Change '?' to 'any'",
    newRangeContent: "any",
});
