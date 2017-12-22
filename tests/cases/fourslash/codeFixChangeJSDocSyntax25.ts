/// <reference path='fourslash.ts' />
////declare class C {
////    p: [|*|];
////}

verify.codeFix({
    description: "Change '*' to 'any'",
    newRangeContent: "any",
});
