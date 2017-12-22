/// <reference path='fourslash.ts' />
////class C {
////    m(): [|*|] {
////    }
////}

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
