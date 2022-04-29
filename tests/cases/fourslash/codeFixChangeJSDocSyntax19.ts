/// <reference path='fourslash.ts' />
//// var index: { new (ix: number): [|?|] };

verify.codeFix({
    description: "Change '?' to 'any'",
    newRangeContent: "any",
});
