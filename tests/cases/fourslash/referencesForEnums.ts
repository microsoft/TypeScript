/// <reference path='fourslash.ts'/>

////enum E {
////    [|value1|] = 1,
////    "[|value2|]" = [|value1|],
////    [|111|] = 11
////}
////
////E.[|value1|];
////E["[|value2|]"];
////E.[|value2|];
////E[[|111|]];

verify.rangesWithSameTextReferenceEachOther();
