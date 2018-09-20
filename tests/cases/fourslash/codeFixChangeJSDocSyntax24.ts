/// <reference path='fourslash.ts' />
////declare class C {
////    m(): [|*|];
////}

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
