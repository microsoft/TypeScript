/// <reference path='fourslash.ts' />
//// var index = { get p(): [|*|] { return 12 } };

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
