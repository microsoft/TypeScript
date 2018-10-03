/// <reference path='fourslash.ts' />
//// var index: { (ix: number): [|?|] };

verify.codeFix({
    description: "Change '?' to 'any'",
    newRangeContent: "any",
});
