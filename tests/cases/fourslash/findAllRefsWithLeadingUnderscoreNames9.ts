/// <reference path='fourslash.ts' />

////(function [|___foo|]() {
////    [|___foo|]();
////})

verify.rangesReferenceEachOther();
