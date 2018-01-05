/// <reference path='fourslash.ts' />
//// var index: { [s: string]: [|*|] };

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
