/// <reference path='fourslash.ts'/>

////var x;
////var n;
////
////function n(x: number, [|n|]: number) {
////    [|n|] = 32;
////    x = [|n|];
////}

verify.rangesReferenceEachOther();
