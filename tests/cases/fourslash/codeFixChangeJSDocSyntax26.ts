/// <reference path='fourslash.ts' />
////class C {
////    p: [|*|] = 12;
////}

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
